# Implementación de Ecommerce-Shop

## Descripción General

Este proyecto es una implementación de un frontend de tienda basado en una Aplicación de Página Única (SPA) construida con Angular 14.2.4. El proyecto se concibió inicialmente para crear una experiencia de compra fluida manejando la mayoría de las interacciones del lado del cliente.

## Contribuidor
- Andrés Fernando Valbuena González

Puedes ver el proyecto en línea en [http://shop.andre-abt.com](http://shop.andre-abt.com). Nota: Las imágenes pixeladas de los productos se usan debido a razones de licenciamiento de imágenes.

## Instalación

1. **Instalar Angular CLI globalmente**
    ```bash
    npm install -g @angular/cli
    ```

2. **Instalar paquetes NPM**
    ```bash
    npm install
    ```

3. **Ejecutar el servidor de desarrollo**
    ```bash
    ng serve
    ```
    Navega a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Verificar la Tienda

Dirige tu navegador a [http://localhost:4200](http://localhost:4200). Si la compilación de desarrollo no funciona, puedes ver la aplicación ya construida en [http://shop.andre-abt.com](http://shop.andre-abt.com). El enrutamiento profundo para el router de Angular se maneja mediante una configuración `.htaccess`.

## Compilar la Aplicación para Producción

Para compilar la aplicación para el entorno de producción:

```bash
ng build --prod --build-optimizer
