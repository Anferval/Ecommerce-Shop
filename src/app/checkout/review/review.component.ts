/**
 * Título: Componente Review
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la revisión final del pedido antes de su finalización. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../account/shared/auth.service';
import { CheckoutService } from '../shared/checkout.service';
import { CartService } from '../../cart/shared/cart.service';
import { MessageService } from '../../messages/message.service';
import { OrderService } from '../../account/orders/shared/order.service';

import { CartItem } from '../../models/cart-item.model';
import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  /**
   * Título: Elementos del carrito
   * Descripción: Lista de elementos presentes en el carrito de compras.
   */
  items: CartItem[];

  /**
   * Título: Total
   * Descripción: Total acumulado del carrito de compras.
   */
  total: number;

  /**
   * Título: Cliente
   * Descripción: Datos del cliente que realiza el pedido.
   */
  customer: Customer;

  /**
   * Título: Método de pago
   * Descripción: Método de pago seleccionado por el cliente.
   */
  paymentMethod: string;

  /**
   * Título: Unsubscribe$
   * Descripción: Sujeto utilizado para cancelar suscripciones y evitar fugas de memoria.
   */
  unsubscribe$ = new Subject();

  /**
   * Título: Usuario
   * Descripción: Datos del usuario autenticado.
   */
  user: User;

  /**
   * Título: Constructor de ReviewComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios necesarios.
   * @param cartService Servicio que gestiona las operaciones del carrito de compras.
   * @param checkoutService Servicio que gestiona el proceso de checkout.
   * @param orderService Servicio que gestiona las operaciones de pedidos.
   * @param router Servicio de enrutamiento para redirigir a diferentes rutas.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   * @param messageService Servicio que gestiona la visualización de mensajes.
   */
  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura los datos del usuario, elementos del carrito, cliente y método de pago.
   */
  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);

    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.itemsChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      });
    this.customer = this.checkoutService.getOrderInProgress().customer;
    this.checkoutService.orderInProgressChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((order: Order) => {
        this.customer = order.customer;
        this.paymentMethod = order.paymentMethod;
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
   * Título: onCompleteOrder
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Completa el pedido y lo envía al servidor.
   */
  public onCompleteOrder() {
    const userUid = this.user ? this.user.uid : false;
    const order = this.checkoutService.getOrderInProgress();
    const total = this.cartService.getTotal();

    this.checkoutService.setOrderItems(this.cartService.getItems());

    if (userUid) {
      this.submitUserOrder(order, total, userUid);
    } else {
      this.submitAnonOrder(order, total);
    }
  }

  /**
   * Título: submitUserOrder
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Envía el pedido del usuario autenticado al servidor.
   * @param order Pedido a enviar.
   * @param total Total del pedido.
   * @param userUid UID del usuario autenticado.
   */
  private submitUserOrder(order, total, userUid) {
    this.orderService
      .addUserOrder(order, total, userUid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.cartService.clearCart();
          this.checkoutService.resetSteps();
          this.router.navigate(['/order-complete']);
        },
        (error) => {
          this.messageService.addError('Could not submit order, try again.');
        }
      );
  }

  /**
   * Título: submitAnonOrder
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Envía el pedido de un usuario anónimo al servidor.
   * @param order Pedido a enviar.
   * @param total Total del pedido.
   */
  private submitAnonOrder(order, total) {
    this.orderService
      .addAnonymousOrder(order, total)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.cartService.clearCart();
          this.checkoutService.resetSteps();
          this.router.navigate(['/order-complete']);
        },
        (error) => {
          this.messageService.addError('Could not submit order, try again.');
        }
      );
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela las suscripciones a los observables.
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

