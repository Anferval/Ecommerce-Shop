/**
 * Título: Componente Content
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona el contenido principal de la aplicación y maneja el cierre de la navegación offcanvas.
 */
import { Component } from '@angular/core';

import { OffcanvasService } from '../shared/offcanvas.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  /**
   * Título: Constructor de ContentComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de navegación offcanvas.
   * @param offcanvasService Servicio que gestiona la navegación offcanvas.
   */
  constructor(private offcanvasService: OffcanvasService) {}

  /**
   * Título: onMenuClose
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de cierre del menú de navegación offcanvas.
   * @param e Evento del clic.
   */
  onMenuClose(e: Event) {
    this.offcanvasService.closeOffcanvasNavigation();
  }
}
