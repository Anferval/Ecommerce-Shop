/**
 * Título: Componente Shipping
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la selección del método de envío durante el proceso de checkout. Implementa OnInit para inicializar el componente.
 */
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../shared/checkout.service';

@Component({
  selector: 'app-checkout-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  /**
   * Título: Formulario de envío
   * Descripción: Formulario reactivo que gestiona la selección del método de envío.
   */
  public formShipping: UntypedFormGroup;

  /**
   * Título: Métodos de envío
   * Descripción: Lista de métodos de envío disponibles.
   */
  public shippingMethods: {method: string, time: string, fee: number, value: string}[];

  /**
   * Título: Constructor de ShippingComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de checkout.
   * @param checkoutService Servicio que gestiona el proceso de checkout.
   */
  constructor(private checkoutService: CheckoutService) { }

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura los métodos de envío disponibles y el formulario de envío.
   */
  ngOnInit() {
    this.shippingMethods = [
      {
        method: 'Swiss Post Priority',
        time: '1 - 2 days',
        fee: 11,
        value: 'priority'
      },
      {
        method: 'Swiss Post Economy',
        time: 'up to one week',
        fee: 9,
        value: 'economy'
      }
    ];
    this.formShipping = new UntypedFormGroup({
      'shippingMethod': new UntypedFormControl(this.shippingMethods[1].value, Validators.required)
    });
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
   * Descripción: Guarda el método de envío seleccionado y avanza al siguiente paso en el proceso de checkout.
   */
  public onContinue() {
    this.checkoutService.setShippingMethod(this.formShipping.controls.shippingMethod.value);
    this.checkoutService.nextStep();
  }
}
