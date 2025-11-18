/*
 * models.js
 * VERSIÓN FINAL (v12 - Arquitectura Correcta):
 * - CAMBIO CLAVE: Usamos Registries.Model.extend en lugar de 'patch'.
 * Esto es lo que usan los módulos de referencia para evitar bucles en Odoo 16.
 * - Lógica: Mantenemos la lógica de datos "super-primero" que ya validamos que funciona.
 */
odoo.define('pos_sale_journal_selection.models', function(require) {
    'use strict';
    
    console.log('DEBUG: Cargando pos_sale_journal_selection.models (v12 - Registries)');

    const { Order, PosGlobalState } = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');

    // --- 1. Extensión de ORDER (Usando Herencia de Clases) ---
    const PosJournalOrder = (Order) => class PosJournalOrder extends Order {
        
        init_from_JSON(json) {
            // Llamada al padre usando sintaxis de clase ES6
            super.init_from_JSON(...arguments);
            
            this.journal_id = json.journal_id;
            console.log('DEBUG: Order.init_from_JSON. Journal:', this.journal_id);
        }

        export_as_JSON() {
            const json = super.export_as_JSON(...arguments);
            json.journal_id = this.get_journal();
            return json;
        }

        set_journal(journal_id) {
            this.journal_id = journal_id;
            // Al usar herencia real, la reactividad funciona mejor sin triggers manuales
        }

        get_journal() {
            if (this.journal_id) {
                return this.journal_id;
            }
            const defaultJournalId = this.pos.config.default_journal_id 
                                     ? this.pos.config.default_journal_id[0] 
                                     : null;
            return defaultJournalId;
        }
    };
    
    // Registro oficial de la extensión
    Registries.Model.extend(Order, PosJournalOrder);
    console.log('✅ Extension PosJournalOrder Registrada');


    // --- 2. Extensión de POS GLOBAL STATE (Usando Herencia de Clases) ---
    const PosJournalGlobalState = (PosGlobalState) => class PosJournalGlobalState extends PosGlobalState {
        
        async _processData(loadedData) {
            // 1. Super primero (Carga lo nativo)
            await super._processData(...arguments);
            
            // 2. Carga de nuestros datos en propiedad separada
            const allJournals = loadedData['custom_pos_journals'] || [];
            
            if (allJournals.length > 0) {
                const defaultJournalId = this.config.default_journal_id 
                                         ? this.config.default_journal_id[0]
                                         : null;
                const saleJournalIds = this.config.selectable_journal_ids || [];
                
                // Filtramos desde la lista que vino de Python
                let journals = allJournals.filter(journal => 
                    journal.type === 'sale' && (saleJournalIds.includes(journal.id) || journal.id === defaultJournalId)
                );
                
                // Asignamos a nuestra propiedad (Esto no entra en conflicto con this.journals)
                this.sale_journals = [...new Set(journals)];
                
                console.log(`✅ ${this.sale_journals.length} sale_journals cargados (v12).`);
            } else {
                this.sale_journals = [];
                console.warn('DEBUG: custom_pos_journals vacío.');
            }
        }
    };

    // Registro oficial de la extensión
    Registries.Model.extend(PosGlobalState, PosJournalGlobalState);
    console.log('✅ Extension PosJournalGlobalState Registrada');
});