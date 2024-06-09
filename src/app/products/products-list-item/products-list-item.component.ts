/**
 * Título: Componente ProductsListItem
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la visualización de un elemento de la lista de productos, incluyendo la lógica para añadir el producto al carrito y manejar el estado de carga de la imagen.
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { CartService } from '../../cart/shared/cart.service';

import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit, OnDestroy {
  /**
   * Título: Suscripción de usuario
   * Descripción: Suscripción al observable que proporciona los datos del usuario autenticado.
   */
  private userSubscription: Subscription;

  /**
   * Título: Producto
   * Descripción: Detalles del producto a mostrar.
   */
  @Input() public product: Product;

  /**
   * Título: Modo de visualización
   * Descripción: Modo en que se visualiza el producto (lista, cuadrícula, etc.).
   */
  @Input() public displayMode: string;

  /**
   * Título: Usuario
   * Descripción: Datos del usuario autenticado.
   */
  public user: User;

  /**
   * Título: Cargando imagen
   * Descripción: Indica si la imagen del producto está en proceso de carga.
   */
  public imageLoading: boolean;

  /**
   * Título: Constructor de ProductsListItemComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios necesarios para gestionar el producto y la autenticación del usuario.
   * @param cartService Servicio que gestiona las operaciones del carrito de compras.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   */
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura la suscripción a los datos del usuario y el estado de carga de la imagen.
   */
  ngOnInit() {
    this.imageLoading = true;
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  /**
   * Título: Añadir al carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Añade el producto al carrito de compras.
   */
  public onAddToCart() {
    this.cartService.addItem(new CartItem(this.product, 1));
  }

  /**
   * Título: Cargar imagen
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de carga de la imagen, actualizando el estado de carga.
   */
  public onImageLoad() {
    this.imageLoading = false;
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela la suscripción a los datos del usuario.
   */
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
