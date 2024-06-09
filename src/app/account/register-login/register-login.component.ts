/**
 * Título: Componente RegisterLogin
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la funcionalidad de registro y login de usuarios. Implementa OnInit para inicializar el componente.
 */
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../messages/message.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  /**
   * Título: Formulario de login
   * Descripción: Formulario reactivo que gestiona los datos de inicio de sesión del usuario.
   */
  public loginForm: UntypedFormGroup;

  /**
   * Título: Formulario de registro
   * Descripción: Formulario reactivo que gestiona los datos de registro del usuario.
   */
  public registerForm: UntypedFormGroup;

  /**
   * Título: Errores de registro
   * Descripción: Almacena los mensajes de error relacionados con el registro.
   */
  public registerErrors: string;

  /**
   * Título: Constructor de RegisterLoginComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios necesarios.
   * @param authenticationService Servicio que gestiona la autenticación de usuarios.
   * @param router Servicio de navegación para redirigir a diferentes rutas.
   * @param messageService Servicio que gestiona la visualización de mensajes.
   */
  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Inicializa los formularios de login y registro.
   */
  ngOnInit() {
    this.initLoginForm();
    this.initRegisterForm();
  }

  /**
   * Título: initLoginForm
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el formulario reactivo de login con los controles y validadores necesarios.
   */
  private initLoginForm() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, Validators.required)
    });
  }

  /**
   * Título: initRegisterForm
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el formulario reactivo de registro con los controles y validadores necesarios.
   */
  private initRegisterForm() {
    this.registerForm = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, Validators.required),
      confirmPassword: new UntypedFormControl(null, Validators.required)
    });
  }

  /**
   * Título: onRegister
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al enviar el formulario de registro. Registra al usuario y maneja los posibles errores.
   */
  public onRegister() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.registerErrors = 'Passwords don\'t match!';
      this.registerForm.controls.password.setErrors({ password: true });
      this.registerForm.controls.confirmPassword.setErrors({ confirmPassword: true });
    } else {
      this.authenticationService.emailSignUp(this.registerForm.value.email, this.registerForm.value.password)
        .then(
          () => {
            this.messageService.add('Account created successfully. Please login with your new credentials!');
            this.loginForm.setValue({ email: this.registerForm.value.email, password: '' });
            this.initRegisterForm();
          },
          (error) => {
            this.registerErrors = error.message;
            if (error.code === 'auth/weak-password') {
              this.registerForm.controls.password.setErrors({ password: true });
              this.registerForm.controls.confirmPassword.setErrors({ confirmPassword: true });
            }
            if (error.code === 'auth/email-already-in-use') {
              this.registerForm.controls.email.setErrors({ email: true });
            }
          }
        );
    }
  }

  /**
   * Título: onLogin
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al enviar el formulario de login. Inicia sesión el usuario y maneja los posibles errores.
   */
  public onLogin() {
    this.authenticationService
      .emailLogin(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        () => {
          this.messageService.add('Login successful!');
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.code === 'auth/user-not-found') {
            this.loginForm.controls.email.setErrors({ email: true });
          }
          if (error.code === 'auth/wrong-password') {
            this.loginForm.controls.password.setErrors({ password: true });
          }
        }
      );
  }
}
