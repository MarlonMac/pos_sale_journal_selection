/*
 * PaymentScreen.js
 * (Sin cambios del último paso, usa selectSaleJournal)
 */
odoo.define('pos_sale_journal_selection.PaymentScreen', function(require) {
    'use-strict';
    console.log('DEBUG: Cargando pos_sale_journal_selection.PaymentScreen (PaymentScreen.js)');

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');

    const PosSaleJournalSelectionPaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {
            
            get saleJournals() {
                return this.env.pos.sale_journals || [];
            }

            /**
             * Se llama al hacer clic en un diario de la lista (desde el XML)
             */
            selectSaleJournal(journal) {
                this.currentOrder.set_journal(journal.id);
                this.render(true); // Actualiza la UI para mostrar la selección
            }
        };
    
    Registries.Component.extend(PaymentScreen, PosSaleJournalSelectionPaymentScreen);
    
    console.log('DEBUG: Extensión pos_sale_journal_selection.PaymentScreen APLICADA');
    return PaymentScreen;
});