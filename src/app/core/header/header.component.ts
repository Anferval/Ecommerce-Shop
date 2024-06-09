/**
 * Título: Componente Header
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona el encabezado de la aplicación, incluyendo la visualización del estado de autenticación del usuario y la navegación offcanvas. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { OffcanvasService } from '../shared/offcanvas.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * Título: Suscripción de autenticación
   * Descripción: Suscripción al observable que proporciona los datos del usuario autenticado.
   */
  private authSubscription: Subscription;

  /**
   * Título: Usuario
   * Descripción: Datos del usuario autenticado.
   */
  public user: User;

  /**
   * Título: Mostrar búsqueda
   * Descripción: Indica si la barra de búsqueda debe ser mostrada.
   */
  public showSearch: boolean;

  /**
   * Título: Constructor de HeaderComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios de autenticación, enrutamiento y navegación offcanvas.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   * @param router Servicio de enrutamiento para redirigir a diferentes rutas.
   * @param offcanvasService Servicio que gestiona la navegación offcanvas.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private offcanvasService: OffcanvasService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Suscribe a los cambios en los datos del usuario autenticado.
   */
  ngOnInit() {
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  /**
   * Título: onLogOut
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el cierre de sesión del usuario y redirige a la página de inicio de sesión.
   * @param e Evento del clic.
   */
  public onLogOut(e: Event) {
    this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }

  /**
   * Título: onMenuToggle
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja la apertura del menú de navegación offcanvas.
   * @param e Evento del clic.
   */
  public onMenuToggle(e: Event) {
    this.offcanvasService.openOffcanvasNavigation();
    e.preventDefault();
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela la suscripción a los cambios en los datos del usuario autenticado.
   */
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

