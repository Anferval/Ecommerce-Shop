/**
 * Título: Componente NavigationMain
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la navegación principal de la aplicación, incluyendo la visualización del estado de autenticación del usuario. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../../../account/shared/auth.service';

import { User } from '../../../models/user.model';

@Component({
  selector: 'app-navigation-main',
  templateUrl: './navigation-main.component.html',
  styleUrls: ['./navigation-main.component.scss']
})
export class NavigationMainComponent implements OnInit, OnDestroy {
  /**
   * Título: Usuario
   * Descripción: Datos del usuario autenticado.
   */
  public user: User;

  /**
   * Título: Suscripción de autenticación
   * Descripción: Suscripción al observable que proporciona los datos del usuario autenticado.
   */
  private authSubscription: Subscription;

  /**
   * Título: Constructor de NavigationMainComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de autenticación.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   */
  constructor(public authService: AuthService) {}

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
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela la suscripción a los cambios en los datos del usuario autenticado.
   */
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
