/**
 * Título: Servicio de Autenticación
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio gestiona la autenticación de usuarios utilizando Firebase. Proporciona métodos para el inicio de sesión, registro, cierre de sesión y actualización de perfil.
 */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Observable, of } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';

import { MessageService } from '../../messages/message.service';
import { User } from '../../models/user.model';

@Injectable()
export class AuthService {
  /**
   * Título: Usuario Observable
   * Descripción: Observable que emite el estado del usuario autenticado.
   */
  public user: Observable<User>;

  /**
   * Título: Constructor de AuthService
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios de autenticación, base de datos y mensajes.
   * @param afAuth Servicio de autenticación de Firebase.
   * @param db Servicio de base de datos de Firebase.
   * @param messageService Servicio que gestiona la visualización de mensajes.
   */
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private messageService: MessageService
  ) {
    this.user = this.afAuth.authState
      .pipe(
        switchMap((auth) => {
          if (auth) {
            return this.db.object('users/' + auth.uid).valueChanges()
              .pipe(
                map((user: User) => {
                  return {
                    ...user,
                    uid: auth.uid
                  };
                })
              );
          } else {
            return of(null);
          }
        })
      );
  }

  /**
   * Título: Inicio de sesión con Google
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para iniciar sesión con Google utilizando Firebase.
   */
  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider).then(
      (credential) => {
        this.updateNewUser(credential.user);
      },
      (error) => {
        throw error;
      }
    );
  }

  /**
   * Título: Registro con Email y Contraseña
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para registrar un nuevo usuario con email y contraseña utilizando Firebase.
   * @param email Email del usuario.
   * @param password Contraseña del usuario.
   */
  public emailSignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(
        (user) => {
          this.updateNewUser(user);
        },
        (error) => {
          throw error;
        }
      );
  }

  /**
   * Título: Inicio de sesión con Email y Contraseña
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para iniciar sesión con email y contraseña utilizando Firebase.
   * @param email Email del usuario.
   * @param password Contraseña del usuario.
   */
  public emailLogin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (user) => {
        this.updateNewUser(user);
      },
      (error) => {
        throw error;
      }
    );
  }

  /**
   * Título: Cerrar sesión
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para cerrar sesión del usuario.
   */
  public signOut() {
    this.afAuth.signOut();
    this.messageService.add('You have been logged out.');
  }

  /**
   * Título: Actualizar Perfil
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para actualizar el perfil del usuario.
   * @param userData Datos del usuario a actualizar.
   */
  public updateProfile(userData: User) {
    this.updateExistingUser(userData);
    this.messageService.add('User profile has been updated!');
  }

  /**
   * Título: Actualizar Contraseña
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para actualizar la contraseña del usuario.
   * @param password Nueva contraseña del usuario.
   */
  public updatePassword(password: string) {
    return this.afAuth.currentUser
      .then(user => user.updatePassword(password))
      .then(() => {
        this.messageService.add('Password has been updated!');
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Título: Actualizar Email
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para actualizar el email del usuario.
   * @param email Nuevo email del usuario.
   */
  public updateEmail(email: string) {
    return this.afAuth.currentUser
      .then(user => user.updateEmail(email))
      .then(() => {
        this.updateExistingUser({ email: email });
        this.messageService.add('User email have been updated!');
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Título: Actualizar Nuevo Usuario
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método privado para actualizar los datos de un nuevo usuario en la base de datos de Firebase.
   * @param authData Datos de autenticación del usuario.
   */
  private updateNewUser(authData) {
    const userData = new User(authData);
    const ref = this.db.object('users/' + authData.uid);
    ref
      .valueChanges()
      .pipe(
        take(1)
      )
      .subscribe((user) => {
        if (!user) {
          ref.update(userData);
        }
      });
  }

  /**
   * Título: Actualizar Usuario Existente
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método privado para actualizar los datos de un usuario existente en la base de datos de Firebase.
   * @param userData Datos del usuario a actualizar.
   */
  private updateExistingUser(userData) {
    this.afAuth.currentUser.then(user => {
      const ref = this.db.object('users/' + user.uid);
      ref
        .valueChanges()
        .pipe(
          take(1)
        )
        .subscribe((user) => {
          ref.update(userData);
        });
    });
  }
}
