/**
 * Título: Componente ToolbarCart
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la visualización y administración del carrito de compras en la barra de herramientas. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CartService } from '../../../../cart/shared/cart.service';

import { CartItem } from '../../../../models/cart-item.model';

@Component({
  selector: 'app-toolbar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class ToolbarCartComponent implements OnInit, OnDestroy {
  /**
   * Título: Elementos del carrito
   * Descripción: Lista de elementos presentes en el carrito de compras.
   */
  public items: CartItem[];

  /**
   * Título: Total
   * Descripción: Total acumulado del carrito de compras.
   */
  public total: number;

  /**
   * Título: Suscripción del carrito
   * Descripción: Suscripción a los cambios en los elementos del carrito.
   */
  private cartSubscription: Subscription;

  /**
   * Título: Constructor de ToolbarCartComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de carrito de compras.
   * @param cartService Servicio que gestiona las operaciones del carrito de compras.
   */
  constructor(private cartService: CartService) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura los elementos y el total del carrito, y suscribe a los cambios en los elementos del carrito.
   */
  ngOnInit() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartSubscription = this.cartService.itemsChanged.subscribe(
      (items: CartItem[]) => {
        this.items = items;
        this.total = this.cartService.getTotal();
      }
    );
  }

  /**
   * Título: onRemoveItem
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja la eliminación de un elemento específico del carrito de compras.
   * @param event Evento del clic.
   * @param item Elemento del carrito a eliminar.
   */
  public onRemoveItem(event, item: CartItem) {
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela la suscripción a los cambios en los elementos del carrito.
   */
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
