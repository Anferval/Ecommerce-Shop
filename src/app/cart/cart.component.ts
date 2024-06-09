/**
 * Título: Componente Cart
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona el carrito de compras, permitiendo visualizar, actualizar y eliminar elementos del carrito.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { CartService } from './shared/cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  /**
   * Título: Suscripción del carrito
   * Descripción: Suscripción a los cambios en los elementos del carrito.
   */
  private cartSubscription: Subscription;

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
   * Título: Constructor de CartComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de carrito de compras.
   * @param cartService Servicio que gestiona las operaciones del carrito de compras.
   */
  constructor(private cartService: CartService) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Obtiene los elementos y el total del carrito, y suscribe a los cambios en los elementos del carrito.
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
   * Título: onClearCart
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para limpiar el carrito de compras.
   * @param event Evento del clic.
   */
  public onClearCart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart();
  }

  /**
   * Título: onRemoveItem
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para eliminar un elemento específico del carrito de compras.
   * @param event Evento del clic.
   * @param item Elemento del carrito a eliminar.
   */
  public onRemoveItem(event, item: CartItem) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  /**
   * Título: increaseAmount
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para aumentar la cantidad de un elemento en el carrito.
   * @param item Elemento del carrito cuya cantidad se va a aumentar.
   */
  public increaseAmount(item: CartItem) {
    this.cartService.updateItemAmount(item, item.amount + 1);
  }

  /**
   * Título: decreaseAmount
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para disminuir la cantidad de un elemento en el carrito.
   * @param item Elemento del carrito cuya cantidad se va a disminuir.
   */
  public decreaseAmount(item: CartItem) {
    const newAmount = item.amount === 1 ? 1 : item.amount - 1;
    this.cartService.updateItemAmount(item, newAmount);
  }

  /**
   * Título: checkAmount
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método para verificar y actualizar la cantidad de un elemento en el carrito.
   * @param item Elemento del carrito cuya cantidad se va a verificar y actualizar.
   */
  public checkAmount(item: CartItem) {
    this.cartService.updateItemAmount(
      item,
      item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount
    );
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

