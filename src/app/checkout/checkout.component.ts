/**
 * Título: Componente Checkout
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona el proceso de checkout, incluyendo los pasos del proceso y el seguimiento del paso activo. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CheckoutService } from './shared/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  /**
   * Título: Suscripción de checkout
   * Descripción: Suscripción a los cambios en los pasos del proceso de checkout.
   */
  checkoutSubscription: Subscription;

  /**
   * Título: Pasos del proceso de checkout
   * Descripción: Lista de pasos en el proceso de checkout.
   */
  steps: string[];

  /**
   * Título: Paso activo
   * Descripción: Número del paso actualmente activo en el proceso de checkout.
   */
  activeStep: number;

  /**
   * Título: Constructor de CheckoutComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de checkout.
   * @param checkoutService Servicio que gestiona el proceso de checkout.
   */
  constructor(private checkoutService: CheckoutService) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura los pasos del proceso de checkout y suscribe a los cambios en el paso activo.
   */
  ngOnInit() {
    this.steps = ['1. Address', '2. Shipping', '3. Payment', '4. Review'];
    this.activeStep = this.checkoutService.activeStep;
    this.checkoutSubscription = this.checkoutService.stepChanged.subscribe((step: number) => {
      this.activeStep = step;
    });
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela la suscripción a los cambios en los pasos del proceso de checkout.
   */
  ngOnDestroy() {
    this.checkoutSubscription.unsubscribe();
  }
}
