/**
 * Título: Componente Profile
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la visualización y actualización del perfil de usuario. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';

import { AuthService } from '../shared/auth.service';

import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  /**
   * Título: Suscripción de autenticación
   * Descripción: Suscripción al observable que proporciona el usuario autenticado.
   */
  private authSubscription: Subscription;

  /**
   * Título: Formulario de perfil
   * Descripción: Formulario reactivo que gestiona los datos del perfil del usuario.
   */
  public formProfile: UntypedFormGroup;

  /**
   * Título: Errores del perfil
   * Descripción: Almacena los mensajes de error relacionados con la actualización del perfil.
   */
  public profileErrors: string;

  /**
   * Título: Usuario
   * Descripción: Almacena los datos del usuario autenticado.
   */
  private user: User;

  /**
   * Título: Constructor de ProfileComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de autenticación.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   */
  constructor(private authService: AuthService) { }

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Inicializa el formulario de perfil y suscribe al observable de usuario para rellenar los datos del perfil.
   */
  ngOnInit() {
    this.initFormGroup();
    this.authSubscription = this.authService.user.subscribe(
      user => {
        if (user) {
          this.formProfile.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          });
          this.user = user;
        }
      }
    );
  }

  /**
   * Título: initFormGroup
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el formulario reactivo con los controles y validadores necesarios.
   */
  private initFormGroup() {
    this.formProfile = new UntypedFormGroup({
      firstName: new UntypedFormControl(null, Validators.required),
      lastName: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(null, Validators.email),
      password: new UntypedFormControl(null),
      confirmPassword: new UntypedFormControl(null),
    });
  }

  /**
   * Título: onSubmit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al enviar el formulario de perfil. Actualiza el email, nombre, apellido y contraseña del usuario.
   */
  public onSubmit() {
    // Actualizar Email
    if (this.user.email !== this.formProfile.value.email) {
      this.authService.updateEmail(this.formProfile.value.email)
        .catch(
          error => {
            this.profileErrors = error.message;
            this.formProfile.patchValue({ email: this.user.email });
          }
        );
    }

    // Actualizar Perfil (Nombre, Apellido)
    if (this.user.firstName !== this.formProfile.value.firstName || this.user.lastName !== this.formProfile.value.lastName) {
      this.authService.updateProfile(this.formProfile.value);
    }

    // Actualizar contraseña
    if (this.formProfile.value.password && this.formProfile.value.confirmPassword
      && (this.formProfile.value.password === this.formProfile.value.confirmPassword)) {
      this.authService.updatePassword(this.formProfile.value.password)
        .catch(
          error => {
            this.profileErrors = error.message;
          }
        );
    }
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela la suscripción al observable de usuario.
   */
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

