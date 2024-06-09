/**
 * Título: Guard de Administrador
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este guard se utiliza para proteger rutas y asegurarse de que solo los usuarios con rol de administrador puedan acceder a ellas. Implementa CanActivate para determinar si la ruta puede ser activada.
 */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../account/shared/auth.service';

import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  /**
   * Título: Constructor de AdminGuard
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios de autenticación y enrutamiento.
   * @param authService Servicio de autenticación.
   * @param router Servicio de enrutamiento.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Título: canActivate
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que determina si la ruta puede ser activada verificando si el usuario tiene rol de administrador.
   * @param next El siguiente ActivatedRouteSnapshot.
   * @param state El estado actual del RouterStateSnapshot.
   * @returns Observable<boolean> | Promise<boolean> | boolean
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      map((user) => (user && user.roles && user.roles.admin ? true : false)),
      tap((authorized) => {
        if (!authorized) {
          this.router.navigate(['/register-login']);
        }
      })
    );
  }
}

