/**
 * Título: Componente Address
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la entrada de la dirección de envío durante el proceso de checkout. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { CheckoutService } from '../shared/checkout.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {
  /**
   * Título: Suscripción de autenticación
   * Descripción: Suscripción al observable que proporciona los datos del usuario autenticado.
   */
  private authSubscription: Subscription;

  /**
   * Título: Usuario
   * Descripción: Datos del usuario autenticado, recibidos como entrada del componente.
   */
  @Input() public user;

  /**
   * Título: Formulario de dirección
   * Descripción: Formulario reactivo que gestiona los datos de la dirección de envío.
   */
  public formAddress: UntypedFormGroup;

  /**
   * Título: Países
   * Descripción: Lista de países disponibles para la dirección de envío.
   */
  public countries: string[];

  /**
   * Título: Constructor de AddressComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios de checkout y autenticación.
   * @param checkoutService Servicio que gestiona el proceso de checkout.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   */
  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Inicializa el formulario y suscribe a los cambios en los datos del usuario autenticado.
   */
  ngOnInit() {
    this.initFormGroup();

    this.authSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
        this.initFormGroup();
      }
    });
  }

  /**
   * Título: initFormGroup
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el formulario reactivo con los controles y validadores necesarios.
   */
  private initFormGroup() {
    this.countries = ['Switzerland'];
    this.formAddress = new UntypedFormGroup({
      firstname: new UntypedFormControl(
        this.user && this.user.firstName,
        Validators.required
      ),
      lastname: new UntypedFormControl(
        this.user && this.user.lastName,
        Validators.required
      ),
      address1: new UntypedFormControl(null, Validators.required),
      address2: new UntypedFormControl(null),
      zip: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern(/^\d\d\d\d$/)
      ]),
      city: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(
        this.user && this.user.email,
        Validators.email
      ),
      phone: new UntypedFormControl(null),
      company: new UntypedFormControl(null),
      country: new UntypedFormControl({ value: this.countries[0], disabled: false })
    });
  }

  /**
   * Título: onContinue
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al continuar con el proceso de checkout. Guarda los datos de la dirección y avanza al siguiente paso.
   */
  public onContinue() {
    this.checkoutService.setCustomer(this.formAddress.value);
    this.checkoutService.nextStep();
  }

  /**
   * Título: onFillForm
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para rellenar el formulario con datos de prueba (para depuración).
   * @param event Evento del clic.
   */
  public onFillForm(event: Event) {
    event.preventDefault();
    this.formAddress.setValue({
      firstname: 'Hans',
      lastname: 'Muster',
      address1: 'Musterstrasse 13',
      address2: '',
      zip: 1234,
      city: 'Musterhausen',
      email: 'hans.muster@muster.com',
      phone: '+41791234567',
      company: '',
      country: 'Switzerland'
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

