/**
 * Título: Componente Payment
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la selección del método de pago durante el proceso de checkout. Implementa OnInit para inicializar el componente.
 */
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { CheckoutService } from '../shared/checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  /**
   * Título: Formulario de pago
   * Descripción: Formulario reactivo que gestiona la selección del método de pago.
   */
  public formPayment: UntypedFormGroup;

  /**
   * Título: Estado de login en PayPal
   * Descripción: Indica si el usuario ha iniciado sesión en PayPal.
   */
  public paypalLoggedIn: boolean;

  /**
   * Título: Métodos de pago
   * Descripción: Lista de métodos de pago disponibles.
   */
  public paymentMethods: string[];

  /**
   * Título: Constructor de PaymentComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de checkout.
   * @param checkoutService Servicio que gestiona el proceso de checkout.
   */
  constructor(private checkoutService: CheckoutService) { }

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Inicializa el formulario de pago y establece los métodos de pago disponibles.
   */
  ngOnInit() {
    this.paypalLoggedIn = false;
    this.paymentMethods = ['Paypal', 'Prepayment'];
    this.formPayment = new UntypedFormGroup({
      'paymentMethod': new UntypedFormControl(this.paymentMethods[0], Validators.required)
    });
  }

  /**
   * Título: onPaypalLogin
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de login en PayPal y actualiza el estado de login.
   * @param event Evento del clic.
   */
  public onPaypalLogin(event: Event) {
    this.paypalLoggedIn = true;
  }

  /**
   * Título: onBack
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Retrocede al paso anterior en el proceso de checkout.
   */
  public onBack() {
    this.checkoutService.previousStep();
  }

  /**
   * Título: onContinue
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Guarda el método de pago seleccionado y avanza al siguiente paso en el proceso de checkout.
   */
  public onContinue() {
    this.checkoutService.setPaymentMethod(this.formPayment.controls.paymentMethod.value);
    this.checkoutService.nextStep();
  }
}

