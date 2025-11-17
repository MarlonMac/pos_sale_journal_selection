# models/pos_session.py
from odoo import models

class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_account_journal(self):
        params = super()._loader_params_account_journal()
        
        config = self.config_id
        if not config:
            return params
            
        sale_journal_ids = set(config.selectable_journal_ids.ids)
        if config.default_journal_id:
            sale_journal_ids.add(config.default_journal_id.id)
        
        if not sale_journal_ids:
            return params

        original_domain = params['search_params']['domain']
        
        journal_ids = self.env['account.journal'].search(original_domain).ids
        
        final_ids = list(set(journal_ids) | sale_journal_ids)

        params['search_params']['domain'] = [('id', 'in', final_ids)]
        
        return params