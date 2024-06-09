/**
 * Título: Archivo principal de inicio de la aplicación
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este archivo gestiona el arranque de la aplicación Angular, incluyendo la configuración del modo de producción y la inicialización del módulo principal de la aplicación.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * Título: Configuración del modo de producción
 * Descripción: Habilita el modo de producción si el entorno está configurado para producción.
 */
if (environment.production) {
  enableProdMode();
}

/**
 * Título: Inicialización del módulo principal
 * Descripción: Inicializa el módulo principal de la aplicación Angular (AppModule) y arranca la aplicación.
 * @catch Maneja cualquier error que ocurra durante el arranque del módulo.
 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
