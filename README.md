# Implementación de Ecommerce-Shop

## Descripción General

Este proyecto es una implementación de un frontend de tienda basado en una Aplicación de Página Única (SPA) construida con Angular 14.2.4. El proyecto se concibió inicialmente para crear una experiencia de compra fluida manejando la mayoría de las interacciones del lado del cliente.

## Contribuidor
- Andrés Fernando Valbuena González

Nota: Las imágenes pixeladas de los productos se usan debido a razones de licenciamiento de imágenes.

## Instalación

1. **Instalar Angular CLI globalmente**
    ```bash
    npm install -g @angular/cli
    ```

2. **Instalar paquetes NPM**
    ```bash
    npm install --legacy-peer-deps
    ```

3. **Ejecutar el servidor de desarrollo**
    ```bash
    ng serve
    ```
    Navega a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Verificar la Tienda

Dirige tu navegador a [http://localhost:4200](http://localhost:4200).

## Compilar la Aplicación para Producción

Para compilar la aplicación para el entorno de producción:

```bash
ng build --prod --build-optimizer
```

# Conjunto de Funcionalidades

## Funcionalidad de la Tienda

### Página Principal de la Tienda
- Productos Destacados con enlaces a páginas de detalles de productos.
- Secciones para "Nuevas Llegadas", "En Oferta" y "Mejor Calificados".

### Productos
- Obtenidos del backend de Firebase y almacenados en caché para futuras solicitudes.
- Ordenamiento por fecha de creación, precio y nombre.
- Opciones de vista en cuadrícula o lista.
- Paginación mediante un `PagingService`.
- Los usuarios administradores tienen botones adicionales para operaciones CRUD de productos.

### CRUD de Productos
- Agregar nuevos productos.
- Editar productos existentes.
- Eliminar productos.
- Manejo de imágenes con Firebase Storage.

### Calificación
- Los productos pueden ser calificados por usuarios registrados de 1 a 5.
- Los usuarios pueden cambiar su calificación anterior.
- La calificación general se actualiza de manera reactiva.

### Carrito
- Los productos pueden añadirse desde la vista de lista/cuadrícula o desde la vista de detalles del producto.
- El carrito es manejado mediante un `CartService`.
- Ajustes de cantidad y eliminación de artículos son soportados.
- Los subtotales y totales se calculan al instante.
- Enlace al checkout desde el carrito.

### Proceso de Compra
- Campos pre-rellenados para usuarios registrados.
- Ingresar dirección, método de envío y datos de pago con validación.
- Resumen de la orden mostrado durante el proceso de compra.
- Las órdenes se vinculan a cuentas de usuario; las órdenes anónimas también son soportadas.

### Autenticación
- Creación de cuentas de usuario y inicio de sesión.
- Autenticación basada en roles.
- Gestión de perfil con actualización de correo electrónico, contraseña, nombre y apellido.
- Historial de órdenes para usuarios registrados.

### Órdenes
- Las órdenes se generan durante el proceso de compra.
- Correos de confirmación de órdenes para tienda, usuario e invitado.
- Visualización de órdenes para usuarios registrados.

### Seguridad
- Reglas de seguridad de Firebase para usuarios y administradores.

### General
- Los precios se manejan mediante un `PriceComponent` para simplificar la visualización/formateo de monedas.
- Funcionalidad de búsqueda por escritura anticipada.
- Actualización de datos en tiempo real mediante Firebase y RxJs.



