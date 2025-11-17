# models/res_config_settings.py
from odoo import models, fields

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    # Este campo 'pos_default_journal_id' (con prefijo)...
    pos_default_journal_id = fields.Many2one(
        # ...se mapea a este campo 'default_journal_id' (sin prefijo)
        related='pos_config_id.default_journal_id',
        readonly=False
    )

    # Este campo 'pos_selectable_journal_ids' (con prefijo)...
    pos_selectable_journal_ids = fields.Many2many(
        # ...se mapea a este campo 'selectable_journal_ids' (sin prefijo)
        related='pos_config_id.selectable_journal_ids',
        readonly=False
    )