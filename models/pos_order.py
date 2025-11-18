# models/pos_order.py
from odoo import fields, models, api

class PosOrder(models.Model):
    _inherit = 'pos.order'

    journal_id = fields.Many2one(
        'account.journal', 
        string='Diario de Venta (PoS)', 
        readonly=True, 
        copy=False
    )

    @api.model
    def _order_fields(self, ui_order):
        fields_data = super(PosOrder, self)._order_fields(ui_order)
        # Guardamos lo que viene del JS
        fields_data['journal_id'] = ui_order.get('journal_id')
        return fields_data

    def _prepare_invoice_vals(self):
        """
        Sobrescribir para usar nuestro journal_id seleccionado
        en lugar del predeterminado de la configuración.
        """
        # 1. Obtener los valores estándar que genera Odoo
        vals = super(PosOrder, self)._prepare_invoice_vals()
        
        # 2. Si tenemos un diario seleccionado específicamente para esta orden...
        if self.journal_id:
            # ...lo imponemos en la factura.
            vals['journal_id'] = self.journal_id.id
            
        return vals