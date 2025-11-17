# -*- coding: utf-8 -*-
{
    'name': 'PoS: Selección de Diario de Venta',
    'version': '16.0.1.0.2',
    'category': 'Point of Sale',
    'summary': 'Permite seleccionar un diario de venta específico al facturar desde el PoS.',
    'author': 'Marlon Macario',
    'website': 'https://github.com/MarlonMac',
    'depends': ['point_of_sale', 'account'],
    'data': [
        'security/ir.model.access.csv',
        'views/res_config_settings_views.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_sale_journal_selection/static/src/js/models.js',
            'pos_sale_journal_selection/static/src/js/PaymentScreen.js',
            'pos_sale_journal_selection/static/src/xml/PaymentScreen.xml',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}