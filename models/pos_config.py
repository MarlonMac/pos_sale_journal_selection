# models/pos_config.py
from odoo import models, fields

class PosConfig(models.Model):
    _inherit = 'pos.config'

    # --- CAMBIO DE NOMBRE AQUÍ ---
    # Renombrado de 'pos_default_journal_id' a 'default_journal_id'
    default_journal_id = fields.Many2one(
        'account.journal',
        string='Diario de Venta por Defecto',
        domain="[('type', '=', 'sale')]",
        help="Diario de venta que se usará por defecto al crear una factura."
    )

    # --- CAMBIO DE NOMBRE AQUÍ ---
    # Renombrado de 'pos_selectable_journal_ids' a 'selectable_journal_ids'
    selectable_journal_ids = fields.Many2many(
        'account.journal',
        string='Diarios de Venta Permitidos',
        domain="[('type', '=', 'sale')]",
        help="Diarios de venta que se podrán seleccionar en el TPV para facturar."
    )