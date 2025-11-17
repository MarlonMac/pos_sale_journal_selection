odoo.define('pos_sale_journal_selection.PaymentScreen', function(require) {
    'use strict';
    
    console.log('✅ Cargando PaymentScreen extension');

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');

    const PosSaleJournalSelectionPaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {
            
            get saleJournals() {
                return this.env.pos.sale_journals || [];
            }
            
            get currentJournalId() {
                if (!this.currentOrder) return null;
                return this.currentOrder.get_journal();
            }

            selectSaleJournal(journal) {
                console.log('📝 Journal seleccionado:', journal.id);
                if (this.currentOrder) {
                    this.currentOrder.set_journal(journal.id);
                }
            }
        };
    
    Registries.Component.extend(PaymentScreen, PosSaleJournalSelectionPaymentScreen);
    
    console.log('✅ PaymentScreen extension aplicada');
    
    return PaymentScreen;
});