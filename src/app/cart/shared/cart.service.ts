/**
 * Título: Servicio de Carrito
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio gestiona las operaciones relacionadas con el carrito de compras, incluyendo la adición, eliminación y actualización de elementos en el carrito.
 */
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { MessageService } from '../../messages/message.service';

@Injectable()
export class CartService {
  /**
   * Título: Elementos del carrito
   * Descripción: Lista de elementos presentes en el carrito de compras.
   */
  private cartItems: CartItem[];

  /**
   * Título: Emisor de cambios en los elementos del carrito
   * Descripción: Emisor de eventos que notifica los cambios en los elementos del carrito.
   */
  public itemsChanged: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>();

  /**
   * Título: Constructor de CartService
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de mensajes y la lista de elementos del carrito.
   * @param messageService Servicio que gestiona la visualización de mensajes.
   */
  constructor(private messageService: MessageService) {
    this.cartItems = [];
  }

  /**
   * Título: Obtener elementos del carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Retorna una copia de los elementos presentes en el carrito de compras.
   * @returns CartItem[]
   */
  public getItems() {
    return this.cartItems.slice();
  }

  /**
   * Título: Obtener IDs de productos en el carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Obtiene los IDs de los productos presentes en el carrito.
   * @returns number[]
   */
  private getItemIds() {
    return this.getItems().map(cartItem => cartItem.product.id);
  }

  /**
   * Título: Añadir elemento al carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Añade un nuevo elemento al carrito de compras. Si el elemento ya existe, incrementa su cantidad.
   * @param item Elemento del carrito a añadir.
   */
  public addItem(item: CartItem) {
    if (this.getItemIds().includes(item.product.id)) {
      this.cartItems.forEach(function (cartItem) {
        if (cartItem.product.id === item.product.id) {
          cartItem.amount += item.amount;
        }
      });
      this.messageService.add('Amount in cart changed for: ' + item.product.name);
    } else {
      this.cartItems.push(item);
      this.messageService.add('Added to cart: ' + item.product.name);
    }
    this.itemsChanged.emit(this.cartItems.slice());
  }

  /**
   * Título: Añadir múltiples elementos al carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Añade múltiples elementos al carrito de compras.
   * @param items Lista de elementos del carrito a añadir.
   */
  public addItems(items: CartItem[]) {
    items.forEach((cartItem) => {
      this.addItem(cartItem);
    });
  }

  /**
   * Título: Eliminar elemento del carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Elimina un elemento específico del carrito de compras.
   * @param item Elemento del carrito a eliminar.
   */
  public removeItem(item: CartItem) {
    const indexToRemove = this.cartItems.findIndex(element => element === item);
    this.cartItems.splice(indexToRemove, 1);
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Deleted from cart: ' + item.product.name);
  }

  /**
   * Título: Actualizar cantidad de un elemento en el carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Actualiza la cantidad de un elemento específico en el carrito de compras.
   * @param item Elemento del carrito cuya cantidad se va a actualizar.
   * @param newAmount Nueva cantidad del elemento.
   */
  public updateItemAmount(item: CartItem, newAmount: number) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        cartItem.amount = newAmount;
      }
    });
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Updated amount for: ' + item.product.name);
  }

  /**
   * Título: Limpiar carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Elimina todos los elementos del carrito de compras.
   */
  public clearCart() {
    this.cartItems = [];
    this.itemsChanged.emit(this.cartItems.slice());
    this.messageService.add('Cleared cart');
  }

  /**
   * Título: Obtener total del carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Calcula y retorna el total acumulado del carrito de compras.
   * @returns number
   */
  public getTotal() {
    let total = 0;
    this.cartItems.forEach((cartItem) => {
      total += cartItem.amount * cartItem.product.price;
    });
    return total;
  }
}

