/**
 * Título: Servicio MessageService
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio gestiona la visualización de mensajes y notificaciones utilizando ngx-toastr.
 */
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {
  /**
   * Título: Mensajes
   * Descripción: Lista de mensajes almacenados.
   */
  private messages: string[] = [];

  /**
   * Título: Configuración de Toastr
   * Descripción: Configuración personalizada para ngx-toastr.
   */
  private toastrConfig: {} = {
    disableTimeOut: false,
    closeButton: false,
    positionClass: 'toast-bottom-right'
  };

  /**
   * Título: Constructor de MessageService
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de ngx-toastr.
   * @param toastr Servicio de ngx-toastr para mostrar notificaciones.
   */
  constructor(private toastr: ToastrService) {}

  /**
   * Título: Añadir mensaje
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Añade un mensaje a la lista y muestra una notificación de éxito.
   * @param message Mensaje a añadir y mostrar.
   */
  public add(message: string): void {
    this.messages.push(message);
    this.toastr.success(message, 'Message:', this.toastrConfig);
  }

  /**
   * Título: Añadir mensaje de error
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Muestra una notificación de error.
   * @param message Mensaje de error a mostrar.
   */
  public addError(message: string): void {
    this.toastr.error(message, 'Message:', this.toastrConfig);
  }

  /**
   * Título: Limpiar mensajes
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Limpia todos los mensajes almacenados.
   */
  public clear(): void {
    this.messages = [];
  }
}
