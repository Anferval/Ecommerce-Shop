/**
 * Título: Componente Sidebar
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la visualización del resumen del carrito de compras en la barra lateral durante el proceso de checkout. Implementa OnInit para inicializar el componente.
 */
import { Component, OnInit } from '@angular/core';

import { CartService } from '../../cart/shared/cart.service';

@Component({
  selector: 'app-checkout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /**
   * Título: Subtotal del carrito
   * Descripción: Subtotal de los productos en el carrito de compras.
   */
  public cartSubtotal: number;

  /**
   * Título: Costo de envío
   * Descripción: Costo del envío, actualmente codificado.
   */
  public shipping: number;

  /**
   * Título: Total del pedido
   * Descripción: Total acumulado del pedido, incluyendo productos y envío.
   */
  public orderTotal: number;

  /**
   * Título: Constructor de SidebarComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de carrito de compras.
   * @param cartService Servicio que gestiona las operaciones del carrito de compras.
   */
  constructor(private cartService: CartService) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Calcula y establece los valores del subtotal del carrito, costo de envío y total del pedido.
   */
  ngOnInit() {
    this.cartSubtotal = this.cartService.getTotal();
    // TODO: Envío, actualmente codificado.
    this.shipping = 9;
    this.orderTotal = this.cartSubtotal + this.shipping;
  }
}
