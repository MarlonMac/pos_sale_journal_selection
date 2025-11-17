# ==============================================================================
# ARCHIVO 1: models/pos_session.py (YA FUNCIONA - NO CAMBIAR)
# ==============================================================================
from odoo import models
import logging

_logger = logging.getLogger(__name__)

class PosSession(models.Model):
    _inherit = 'pos.session'

    def load_pos_data(self):
        result = super().load_pos_data()
        
        config = self.config_id
        if not config:
            return result
            
        sale_journal_ids = set(config.selectable_journal_ids.ids)
        if config.default_journal_id:
            sale_journal_ids.add(config.default_journal_id.id)
        
        if not sale_journal_ids:
            return result

        bank_cash_journals = self.env['account.journal'].search([
            ('type', 'in', ['bank', 'cash']),
            ('company_id', '=', config.company_id.id)
        ])
        
        sale_journals = self.env['account.journal'].browse(list(sale_journal_ids))
        all_journals = bank_cash_journals | sale_journals
        
        journal_data = all_journals.read([
            'id', 'name', 'code', 'type', 'sequence',
            'currency_id', 'company_id'
        ])
        
        result['custom_pos_journals'] = journal_data
        _logger.info(f"✅ Enviando {len(journal_data)} journals en 'custom_pos_journals'")
        
        return result
