/**
 * Título: Clase CartItem
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Esta clase representa un elemento del carrito de compras, incluyendo el producto y la cantidad.
 */
import { Product } from './product.model';

export class CartItem {
  /**
   * Título: Producto
   * Descripción: Producto que se añade al carrito.
   */
  public product: Product;

  /**
   * Título: Cantidad
   * Descripción: Cantidad del producto en el carrito.
   */
  public amount: number;

  /**
   * Título: Constructor de CartItem
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa un nuevo elemento del carrito con un producto y una cantidad.
   * @param product Producto que se añade al carrito.
   * @param amount Cantidad del producto en el carrito.
   */
  constructor(product: Product, amount: number) {
    this.product = product;
    this.amount = amount;
  }
}
