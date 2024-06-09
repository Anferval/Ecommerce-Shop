/**
 * Título: Servicio Offcanvas
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio gestiona el estado de la navegación offcanvas, permitiendo abrir, cerrar y alternar su visibilidad.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OffcanvasService {
  /**
   * Título: Estado de la navegación offcanvas
   * Descripción: Un BehaviorSubject que almacena el estado de visibilidad de la navegación offcanvas.
   */
  public offcanvasNavigationOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Título: Alternar navegación offcanvas
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Alterna el estado de la navegación offcanvas entre abierto y cerrado.
   */
  public toggleOffcanvasNavigation() {
    const state = !this.offcanvasNavigationOpen.getValue();
    this.offcanvasNavigationOpen.next(state);
  }

  /**
   * Título: Abrir navegación offcanvas
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Establece el estado de la navegación offcanvas como abierto.
   */
  public openOffcanvasNavigation() {
    this.offcanvasNavigationOpen.next(true);
  }

  /**
   * Título: Cerrar navegación offcanvas
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Establece el estado de la navegación offcanvas como cerrado.
   */
  public closeOffcanvasNavigation() {
    this.offcanvasNavigationOpen.next(false);
  }
}
