/**
 * Título: Componente Account
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la cuenta del usuario, proporcionando acceso a los servicios de autenticación, enrutamiento y órdenes.
 */
import { Component } from '@angular/core';

import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { OrderService } from './orders/shared/order.service';

import { User } from '../models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  /**
   * Título: Usuario
   * Descripción: Almacena los datos del usuario autenticado.
   */
  public user: User;

  /**
   * Título: Constructor de AccountComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios de autenticación, enrutamiento y órdenes.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   * @param router Servicio de enrutamiento para redirigir a diferentes rutas.
   * @param orderService Servicio que gestiona las órdenes.
   */
  constructor(
    private authService: AuthService,
    public router: Router,
    public orderService: OrderService
  ) {}
}
