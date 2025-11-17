# models/pos_order.py
from odoo import fields, models, api

class PosOrder(models.Model):
    _inherit = 'pos.order'

    # 1. Definir el nuevo campo para guardar nuestro journal_id.
    #    Odoo 16 lo usará automáticamente al crear la factura.
    journal_id = fields.Many2one(
        'account.journal', 
        string='Diario de Venta (PoS)', 
        readonly=True, 
        copy=False
    )

    # 2. Sobrescribir _order_fields para guardar el valor del JS
    @api.model
    def _order_fields(self, ui_order):
        fields_data = super(PosOrder, self)._order_fields(ui_order)
        # El nombre del campo aquí debe coincidir con el de JavaScript
        fields_data['journal_id'] = ui_order.get('journal_id')
        return fields_data

    # 3. NO AÑADIR NINGÚN _compute_sale_journal. 
    #    Ese campo ya no existe.