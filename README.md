# Proyecto de Facturación: Sistema Dinámico 💳📊

Este proyecto es una **aplicación web** para gestionar facturas de productos. Permite agregar productos, ver los detalles de la compra, calcular totales y realizar pagos. Todo esto se maneja de manera **dinámica** utilizando **Web Components**.

## 🚀 Funcionalidades

- **Selección de Producto 🛒**: Permite elegir productos de una lista desplegable.
- **Detalle de Compra 📝**: Muestra los productos seleccionados con su cantidad, subtotal y la opción de eliminar productos.
- **Resumen de Factura 💰**: Calcula el total de la compra y permite realizar el pago.
- **Gestión de Datos 📊**: Maneja los detalles de la compra y limpia la factura tras el pago.

## 💻 Tecnologías Utilizadas

- **HTML**: Estructura y contenido básico de la aplicación.
- **CSS (Bootstrap)**: Estilización responsiva y moderna para la interfaz de usuario.
- **JavaScript**: Funcionalidad dinámica de la aplicación, incluyendo la manipulación de eventos y la gestión de productos.
- **Web Components**: Para crear componentes reutilizables y encapsulados (productos, detalle y resumen de factura).
- **Eventos personalizados (CustomEvent)**: Para la actualización de la interfaz de manera reactiva.

## 📂 Estructura del Proyecto

```plaintext
/
│
├── components/
│   ├── productsComponent.js      # Componente para seleccionar productos
│   ├── detailComponent.js        # Componente para mostrar el detalle de la compra
│   └── summaryComponent.js       # Componente para mostrar el resumen y pagar
│   └── userComponent.js          # Componente para mostrar los datos del usuario
│
│
├── controllers/
│   ├── detail.js                 # Lógica para manejar el detalle de la factura
│   └── products.js               # Lógica para manejar los productos
│   └── summary.js                # Lógica para sumar los productos en la factura
│
│
├── css/
│   └── bootstrap.min.css         # Estilos de Bootstrap
│
├── index.html                    # Página principal
└── README.md                     # Este archivo de documentación
