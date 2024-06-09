/**
 * Título: Componente NavigationOffCanvas
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la navegación offcanvas, incluyendo el estado de autenticación del usuario y la lógica para cerrar la navegación offcanvas.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { OffcanvasService } from '../shared/offcanvas.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-navigation-off-canvas',
  templateUrl: './navigation-off-canvas.component.html',
  styleUrls: ['./navigation-off-canvas.component.scss']
})
export class NavigationOffCanvasComponent implements OnInit, OnDestroy {
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
   * Título: Constructor de NavigationOffCanvasComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios de navegación offcanvas, autenticación y enrutamiento.
   * @param offcanvasService Servicio que gestiona la navegación offcanvas.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   * @param router Servicio de enrutamiento para redirigir a diferentes rutas.
   */
  constructor(
    public offcanvasService: OffcanvasService,
    public authService: AuthService,
    private router: Router
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
   * Título: onLogout
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el cierre de sesión del usuario y redirige a la página de inicio de sesión.
   * @param e Evento del clic.
   */
  public onLogout(e: Event) {
    this.offcanvasService.closeOffcanvasNavigation();
    this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }

  /**
   * Título: onNavigationClick
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el clic en un elemento de navegación, cerrando la navegación offcanvas.
   */
  public onNavigationClick() {
    this.offcanvasService.closeOffcanvasNavigation();
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

