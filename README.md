# PoS: Selección de Diario de Venta (pos_sale_journal_selection)

Este módulo extiende la funcionalidad del Punto de Venta de Odoo 16 Community para permitir al usuario seleccionar un diario de venta específico al momento de generar una factura desde la pantalla de pago.

## Funcionalidad

Por defecto, Odoo PoS utiliza un único diario de ventas (definido en la configuración del PoS) para todas las facturas. Este módulo añade:

* Un selector de "Diario de Factura" en la pantalla de pago del PoS.
* Este selector solo aparece cuando el botón **"Factura de cliente"** está activado.
* La lista de diarios en el selector es configurable por cada Punto de Venta.

## Configuración

1.  Después de instalar el módulo, vaya a **Punto de Venta > Configuración > Punto de Venta**.
2.  Edite el PoS que desea configurar.
3.  En la sección **Facturación y Recibos**, encontrará dos nuevos campos:
    * **Diario de Ventas por Defecto (Factura):** El diario que se seleccionará automáticamente al activar la facturación.
    * **Diarios de Venta Permitidos (Factura):** La lista completa de diarios entre los que el cajero puede elegir.

**Importante:** Para que el selector aparezca en el PoS, debe haber al menos un diario configurado en "Diarios de Venta Permitidos".

## Funcionamiento

1.  Inicie una sesión de PoS.
2.  Añada productos al carrito y vaya a la pantalla de "Pago".
3.  Haga clic en el botón "Factura de cliente".
4.  Automáticamente, aparecerá un nuevo selector debajo del botón, pre-seleccionado con el "Diario por Defecto".
5.  Si es necesario, el cajero puede cambiar el diario usando este selector.
6.  Al validar el pago, la factura generada se registrará en el diario seleccionado.