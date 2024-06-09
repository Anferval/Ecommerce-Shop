/**
 * Título: Componente ProductDetail
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la visualización de los detalles de un producto, incluyendo imágenes, calificaciones y funcionalidad para añadir al carrito.
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../account/shared/auth.service';
import { CartService } from '../../cart/shared/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { ProductsCacheService } from '../shared/products-cache.service';
import { ProductRatingService } from '../shared/product-rating.service';
import { ProductService } from '../shared/product.service';

import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  /**
   * Título: Unsubscribe$
   * Descripción: Sujeto utilizado para cancelar suscripciones y evitar fugas de memoria.
   */
  private unsubscribe$ = new Subject();

  /**
   * Título: Producto
   * Descripción: Detalles del producto a mostrar.
   */
  @Input() public product: Product;

  /**
   * Título: Cargando producto
   * Descripción: Indica si el producto está en proceso de carga.
   */
  public productLoading: boolean;

  /**
   * Título: Usuario
   * Descripción: Datos del usuario autenticado.
   */
  public user: User;

  /**
   * Título: Imágenes cargadas
   * Descripción: Lista de URLs de imágenes que se han cargado correctamente.
   */
  public imagesLoaded: string[];

  /**
   * Título: URL de la imagen activa
   * Descripción: URL de la imagen actualmente visible.
   */
  public activeImageUrl: string;

  /**
   * Título: Índice de la imagen activa
   * Descripción: Índice de la imagen actualmente visible.
   */
  public activeImageIndex: number;

  /**
   * Título: Cantidad seleccionada
   * Descripción: Cantidad del producto seleccionada para añadir al carrito.
   */
  public selectedQuantity: number;

  /**
   * Título: Cantidad de calificaciones
   * Descripción: Número total de calificaciones del producto.
   */
  public ratingCount: number;

  /**
   * Título: Valores de calificación
   * Descripción: Lista de posibles valores de calificación.
   */
  public ratingValues: number[];

  /**
   * Título: Calificación seleccionada
   * Descripción: Calificación seleccionada por el usuario.
   */
  public selectedRating: any;

  /**
   * Título: Constructor de ProductDetailComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios necesarios para gestionar los detalles del producto.
   * @param router Servicio de enrutamiento para redirigir a diferentes rutas.
   * @param route Servicio de ruta activa para obtener parámetros de la URL.
   * @param location Servicio de localización para manipular la URL del navegador.
   * @param authService Servicio que gestiona la autenticación de usuarios.
   * @param cartService Servicio que gestiona las operaciones del carrito de compras.
   * @param productsCacheService Servicio que gestiona la caché de productos.
   * @param productService Servicio que gestiona las operaciones de productos.
   * @param productRatingService Servicio que gestiona las calificaciones de productos.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private cartService: CartService,
    private productsCacheService: ProductsCacheService,
    private productService: ProductService,
    private productRatingService: ProductRatingService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura la obtención de datos del producto y del usuario.
   */
  ngOnInit(): void {
    this.authService.user
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.user = user;
      });

    this.ratingValues = [1, 2, 3, 4, 5];
    this.selectedQuantity = 1;
    this.imagesLoaded = [];

    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.getProduct();
      });
  }

  /**
   * Título: Obtener producto
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Obtiene los detalles del producto desde el servicio de productos.
   */
  private getProduct(): void {
    this.productLoading = true;

    const id = +this.route.snapshot.paramMap.get('id');

    this.productService
      .getProduct(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((product: Product) => {
        if (product) {
          this.product = product;
          this.setupProduct();
          this.productLoading = false;
        } else {
          this.router.navigate(['/404-product-not-found']);
        }
      });
  }

  /**
   * Título: Seleccionar miniatura
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja la selección de una miniatura de imagen.
   * @param event Evento del clic.
   * @param index Índice de la imagen seleccionada.
   */
  public onSelectThumbnail(event, index) {
    event.preventDefault();
    this.activeImageUrl = this.product.imageURLs[index];
    this.activeImageIndex = index;
  }

  /**
   * Título: Añadir al carrito
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Añade el producto al carrito de compras.
   */
  public onAddToCart() {
    this.cartService.addItem(new CartItem(this.product, this.selectedQuantity));
  }

  /**
   * Título: Seleccionar cantidad
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja la selección de la cantidad del producto a añadir al carrito.
   * @param event Evento del cambio de valor.
   */
  public onSelectQuantity(event) {
    this.selectedQuantity = <number>+event.target.value;
  }

  /**
   * Título: Calificar producto
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Envía la calificación seleccionada para el producto.
   */
  public onRate() {
    const rating = parseInt(this.selectedRating, 10);
    this.productRatingService
      .rateProduct(this.product, rating)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.getProduct();
      });
  }

  /**
   * Título: Cargar imagen
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de carga de una imagen y añade la URL de la imagen a la lista de imágenes cargadas.
   * @param e Evento de carga de imagen.
   */
  public onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
  }

  /**
   * Título: Configurar producto
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Configura los detalles del producto una vez que ha sido obtenido.
   */
  private setupProduct() {
    if (this.product) {
      this.checkCategories();
      this.checkRatings();
      this.activeImageUrl = this.product.imageURLs[0];
      this.activeImageIndex = 0;
    }
  }

  /**
   * Título: Verificar categorías
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Verifica y formatea las categorías del producto.
   */
  private checkCategories() {
    const categories = Object.keys(this.product.categories).map(
      (category, index, inputArray) => {
        category = index < inputArray.length - 1 ? category + ',' : category;
        return category;
      }
    );
    this.product.categories = categories.length >= 1 && !Array.isArray(this.product.categories)
      ? categories
      : [];
  }

  /**
   * Título: Verificar calificaciones
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Verifica y actualiza las calificaciones del producto.
   */
  private checkRatings() {
    this.ratingCount = this.product.ratings
      ? Object.keys(this.product.ratings).length
      : 0;

    // check for existing rating
    if (
      this.product.ratings &&
      this.user &&
      Object.keys(this.product.ratings).includes(this.user.uid)
    ) {
      this.selectedRating = this.product.ratings[this.user.uid];
    }
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
