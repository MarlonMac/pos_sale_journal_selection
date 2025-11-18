# -*- coding: utf-8 -*-
{
    'name': 'PoS: Selección de Diario de Venta (Multi-Journal)',
    'version': '16.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'Permite seleccionar el diario de facturación directamente desde la interfaz del PoS.',
    'description': """
POS Sale Journal Selection
==========================

Este módulo extiende la funcionalidad nativa de Odoo 16 Community para permitir la selección dinámica del diario de ventas (Sales Journal) en el momento del pago en el Punto de Venta.

Características Principales:
----------------------------
* **Selección en Tiempo Real:** Botones en la pantalla de pago para cambiar el diario.
* **Configuración Flexible:** Define qué diarios son seleccionables desde los ajustes del PoS.
* **Persistencia:** Garantiza que la factura generada en el backend corresponda al diario seleccionado, sobrescribiendo el comportamiento por defecto.

Desarrollado por **Marlon Macario** para la comunidad **OdooLibreGT**.
    """,
    'author': 'Marlon Macario para OdooLibreGT',
    'website': 'https://github.com/MarlonMac',
    'license': 'LGPL-3',
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
    'price': 0.00,
    'currency': 'USD',
}