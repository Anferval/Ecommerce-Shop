/**
 * Título: Servicio de Checkout
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio gestiona el proceso de checkout, incluyendo los pasos del proceso, los datos del pedido en progreso y la actualización de métodos de envío y pago.
 */
import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '../../models/order.model';
import { Customer } from '../../models/customer.model';
import { CartItem } from '../../models/cart-item.model';

@Injectable()
export class CheckoutService {
  /**
   * Título: Pedido en progreso
   * Descripción: Almacena los datos del pedido que se está realizando.
   */
  private orderInProgress: Order;

  /**
   * Título: Evento de cambio en el pedido en progreso
   * Descripción: Emisor de eventos que notifica los cambios en el pedido en progreso.
   */
  public orderInProgressChanged: EventEmitter<Order> = new EventEmitter<Order>();

  /**
   * Título: Evento de cambio de paso
   * Descripción: Emisor de eventos que notifica los cambios en el paso activo del proceso de checkout.
   */
  public stepChanged: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Título: Paso activo
   * Descripción: Almacena el paso actual del proceso de checkout.
   */
  public activeStep: number;

  /**
   * Título: Constructor de CheckoutService
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el pedido en progreso y establece el paso activo en 0.
   */
  constructor() {
    this.orderInProgress = new Order(new Customer());
    this.activeStep = 0;
  }

  /**
   * Título: Ir a un paso específico
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Cambia el paso activo a un número específico y emite el evento de cambio de paso.
   * @param number Número del paso al que se desea ir.
   */
  public gotoStep(number: number) {
    this.activeStep = number;
    this.stepChanged.emit(this.activeStep);
  }

  /**
   * Título: Avanzar al siguiente paso
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Avanza al siguiente paso en el proceso de checkout y emite el evento de cambio de paso.
   */
  public nextStep() {
    this.activeStep++;
    this.stepChanged.emit(this.activeStep);
  }

  /**
   * Título: Retroceder al paso anterior
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Retrocede al paso anterior en el proceso de checkout y emite el evento de cambio de paso.
   */
  public previousStep() {
    this.activeStep--;
    this.stepChanged.emit(this.activeStep);
  }

  /**
   * Título: Reiniciar los pasos
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Reinicia el proceso de checkout estableciendo el paso activo en 0.
   */
  public resetSteps() {
    this.activeStep = 0;
  }

  /**
   * Título: Establecer datos del cliente
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Establece los datos del cliente en el pedido en progreso y emite el evento de cambio en el pedido.
   * @param customer Datos del cliente.
   */
  public setCustomer(customer: Customer) {
    this.orderInProgress.customer = customer;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }

  /**
   * Título: Establecer método de envío
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Establece el método de envío en el pedido en progreso y emite el evento de cambio en el pedido.
   * @param shippingMethod Método de envío seleccionado.
   */
  public setShippingMethod(shippingMethod: string) {
    this.orderInProgress.shippingMethod = shippingMethod;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }

  /**
   * Título: Establecer elementos del pedido
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Establece los elementos del carrito en el pedido en progreso y emite el evento de cambio en el pedido.
   * @param items Lista de elementos del carrito.
   */
  public setOrderItems(items: CartItem[]) {
    this.orderInProgress.items = items;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }

  /**
   * Título: Obtener pedido en progreso
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Retorna el pedido en progreso.
   * @returns Pedido en progreso.
   */
  public getOrderInProgress() {
    return this.orderInProgress;
  }

  /**
   * Título: Establecer método de pago
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Establece el método de pago en el pedido en progreso y emite el evento de cambio en el pedido.
   * @param paymentMethod Método de pago seleccionado.
   */
  public setPaymentMethod(paymentMethod: string) {
    this.orderInProgress.paymentMethod = paymentMethod;
    this.orderInProgressChanged.emit(this.orderInProgress);
  }
}
