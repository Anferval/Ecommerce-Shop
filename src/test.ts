/**
 * Título: Archivo de configuración de pruebas para Karma
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este archivo es requerido por karma.conf.js y carga recursivamente todos los archivos .spec y los archivos de framework necesarios para ejecutar las pruebas en Angular.
 */

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Desafortunadamente, no hay tipado para la variable `__karma__`. Se declara como any.
declare const __karma__: any;
declare const require: any;

// Previene que Karma se ejecute prematuramente.
__karma__.loaded = function () {};

// Primero, inicializa el entorno de pruebas de Angular.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
  }
);

// Luego, encontramos todas las pruebas.
const context = require.context('./', true, /\.spec\.ts$/);
// Y cargamos los módulos.
context.keys().map(context);
// Finalmente, iniciamos Karma para ejecutar las pruebas.
__karma__.start();
