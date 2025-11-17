/*
 * models.js
 * CORREGIDO DE NUEVO:
 * Volvemos a leer 'default_journal_id' como un array [id, "Nombre"]
 * (basado en el último log de la consola).
 */
odoo.define('pos_sale_journal_selection.Order', function(require) {
    'use-strict';
    console.log('DEBUG: Cargando pos_sale_journal_selection.Order (models.js - LEGACY)');

    const { Order, PosGlobalState } = require('point_of_sale.models');
    const { patch } = require('web.utils');

    patch(Order.prototype, 'pos_sale_journal_selection.Order', {
        
        init_from_JSON: function (json) {
            console.log('DEBUG: Order.init_from_JSON INICIO');
            
            // --- CORRECCIÓN BASADA EN EL LOG ---
            // El log muestra: Proxy(Array) {0: 1, 1: 'Customer Invoices'}
            const default_journal_id = this.pos.config.default_journal_id 
                                        ? this.pos.config.default_journal_id[0] // Leer ID de [0]
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
    console.log('DEBUG: Parche pos_sale_journal_selection.Order APLICADO (LEGACY)');

    patch(PosGlobalState.prototype, 'pos_sale_journal_selection.PosGlobalState', {
        async _processData(loadedData) {
            await this._super(loadedData); 
            
            console.log('DEBUG: Procesando sale_journals...');
            
            const allJournals = this.journals || [];
            
            // --- CORRECCIÓN BASADA EN EL LOG ---
            const defaultJournalId = this.config.default_journal_id 
                                     ? this.config.default_journal_id[0] // Leer ID de [0]
                                     : null;
            const saleJournalIds = this.config.selectable_journal_ids || []; 
            
            console.log('DEBUG: this.config.default_journal_id (ID por defecto):', defaultJournalId);
            console.log('DEBUG: this.config.selectable_journal_ids (IDs permitidos):', JSON.stringify(saleJournalIds));
            
            console.log('DEBUG: this.journals (TODOS los diarios cargados):', JSON.stringify(allJournals.map(j => ({id: j.id, name: j.name, type: j.type}))));

            let journals = allJournals.filter(journal => 
                journal.type === 'sale' && (saleJournalIds.includes(journal.id) || journal.id === defaultJournalId)
            );
            
            this.sale_journals = [...new Set(journals)];

            console.log(`DEBUG: ${this.sale_journals.length} sale_journals cargados (final).`);
        }
    });
    console.log('DEBUG: Parche pos_sale_journal_selection.PosGlobalState APLICADO (LEGACY)');
});