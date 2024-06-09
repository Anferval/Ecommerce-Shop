/**
 * Título: Componente Orders
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente se encarga de gestionar la visualización de las órdenes. Implementa OnInit para inicializar
 *              el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  CurrencyPipe
} from '@angular/common';

import { Subscription } from 'rxjs';

import { OrderService } from './shared/order.service';

import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  /**
   * Título: Lista de órdenes
   * Descripción: Arreglo que almacena las órdenes obtenidas del servicio de órdenes.
   */
  public orders: Order[];

  /**
   * Título: Suscripción de órdenes
   * Descripción: Suscripción al observable que proporciona las órdenes desde el servicio de órdenes.
   */
  private ordersSubscription: Subscription;

  /**
   * Título: Constructor de OrdersComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de órdenes.
   * @param orderService Servicio que proporciona las órdenes.
   */
  constructor(public orderService: OrderService) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Suscribe a la lista de órdenes y las invierte.
   */
  ngOnInit() {
    this.ordersSubscription = this.orderService
      .getOrders()
      .subscribe((orders: Order[]) => {
        if (orders) {
          this.orders = orders.reverse();
        }
      });
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela la suscripción a la lista de órdenes.
   */
  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
}

