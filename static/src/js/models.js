odoo.define('pos_sale_journal_selection.Order', function(require) {
    'use-strict';
    console.log('DEBUG: Cargando pos_sale_journal_selection.Order (models.js - FINAL)');

    const { Order, PosGlobalState } = require('point_of_sale.models');
    const { patch } = require('web.utils');

    patch(Order.prototype, 'pos_sale_journal_selection.Order', {
        
        init_from_JSON: function (json) {
            console.log('DEBUG: Order.init_from_JSON INICIO');
            
            const default_journal_id = this.pos.config.default_journal_id 
                                        ? this.pos.config.default_journal_id[0]
                                        : null;
            
            this.journal_id = json.journal_id || default_journal_id || null;
            
            this._super(json); 
            console.log('DEBUG: Order.init_from_JSON FIN');
        },
        
        export_as_JSON: function () {
            const json = this._super.apply(this, arguments);
            return Object.assign({}, json, {
                journal_id: this.get_journal()
            });
        },
        
        set_journal(journal_id) {
            this.journal_id = journal_id;
        },
        
        get_journal() {
            return this.journal_id;
        }
    });
    console.log('DEBUG: Parche pos_sale_journal_selection.Order APLICADO');

    patch(PosGlobalState.prototype, 'pos_sale_journal_selection.PosGlobalState', {
        async _processData(loadedData) {
            await this._super(loadedData); 
            
            console.log('DEBUG: Procesando sale_journals...');
            
            const customJournals = loadedData['custom_pos_journals'] || [];
            
            console.log('DEBUG: custom_pos_journals recibidos:', JSON.stringify(customJournals.map(j => ({id: j.id, name: j.name, type: j.type}))));
            
            if (customJournals.length > 0) {
                this.journals = customJournals;
                console.log('✅ this.journals INYECTADO con', customJournals.length, 'journals');
            }
            
            const defaultJournalId = this.config.default_journal_id 
                                     ? this.config.default_journal_id[0]
                                     : null;
            const saleJournalIds = this.config.selectable_journal_ids || [];
            
            console.log('DEBUG: default_journal_id:', defaultJournalId);
            console.log('DEBUG: selectable_journal_ids:', JSON.stringify(saleJournalIds));
            console.log('DEBUG: this.journals después de inyección:', JSON.stringify(this.journals.map(j => ({id: j.id, name: j.name, type: j.type}))));

            let journals = this.journals.filter(journal => 
                journal.type === 'sale' && (saleJournalIds.includes(journal.id) || journal.id === defaultJournalId)
            );
            
            this.sale_journals = [...new Set(journals)];

            console.log(`DEBUG: ${this.sale_journals.length} sale_journals cargados (final).`);
        }
    });
    console.log('DEBUG: Parche pos_sale_journal_selection.PosGlobalState APLICADO');
});