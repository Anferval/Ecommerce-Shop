/**
 * Título: Clase Order
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Esta clase representa un pedido, incluyendo detalles del cliente, elementos del carrito, total, estado, número, fecha, método de envío y método de pago.
 */
import { CartItem } from './cart-item.model';
import { Customer } from './customer.model';

export class Order {
  /**
   * Título: Cliente
   * Descripción: Detalles del cliente que realiza el pedido.
   */
  public customer: Customer;

  /**
   * Título: Elementos del carrito
   * Descripción: Lista de elementos del carrito incluidos en el pedido.
   */
  public items: CartItem[];

  /**
   * Título: Total
   * Descripción: Total acumulado del pedido.
   */
  public total: number;

  /**
   * Título: Estado
   * Descripción: Estado actual del pedido.
   */
  public status: string;

  /**
   * Título: Número de pedido
   * Descripción: Número único identificador del pedido.
   */
  public number: string;

  /**
   * Título: Fecha
   * Descripción: Fecha en que se realizó el pedido.
   */
  public date: string;

  /**
   * Título: Método de envío
   * Descripción: Método de envío seleccionado para el pedido.
   */
  public shippingMethod: string;

  /**
   * Título: Método de pago
   * Descripción: Método de pago seleccionado para el pedido.
   */
  public paymentMethod: string;

  /**
   * Título: Constructor de Order
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa un nuevo pedido con los detalles proporcionados. Los parámetros son opcionales y tienen valores predeterminados.
   * @param customer Detalles del cliente que realiza el pedido.
   * @param items Lista de elementos del carrito incluidos en el pedido.
   * @param total Total acumulado del pedido.
   * @param status Estado actual del pedido.
   * @param number Número único identificador del pedido.
   * @param date Fecha en que se realizó el pedido.
   * @param shippingMethod Método de envío seleccionado para el pedido.
   * @param paymentMethod Método de pago seleccionado para el pedido.
   */
  constructor(
    customer: Customer = null,
    items: CartItem[] = null,
    total: number = null,
    status: string = '',
    number: string = '',
    date: string = new Date().toISOString().split('T')[0],
    shippingMethod: string = '',
    paymentMethod: string = ''
  ) {
    this.customer = customer;
    this.items = items;
    this.total = total;
    this.status = status;
    this.number = number;
    this.date = date;
    this.shippingMethod = shippingMethod;
    this.paymentMethod = paymentMethod;
  }
}
