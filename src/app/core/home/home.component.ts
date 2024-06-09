/**
 * Título: Componente Home
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la página principal de la aplicación, mostrando productos destacados, nuevas llegadas, productos en oferta y promociones.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MessageService } from '../../messages/message.service';
import { ProductService } from '../../products/shared/product.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';
import { PromoService } from '../shared/promo.service';

import { Product } from '../../models/product.model';
import { Promo } from '../../models/promo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  /**
   * Título: Unsubscribe$
   * Descripción: Sujeto utilizado para cancelar suscripciones y evitar fugas de memoria.
   */
  private unsubscribe$ = new Subject();

  /**
   * Título: Productos
   * Descripción: Lista de todos los productos.
   */
  public products: Product[];

  /**
   * Título: Productos destacados
   * Descripción: Lista de productos destacados.
   */
  public productsFeatured: any;

  /**
   * Título: Nuevas llegadas
   * Descripción: Lista de productos que son nuevas llegadas.
   */
  public productsNewArrivals: Product[];

  /**
   * Título: Productos en oferta
   * Descripción: Lista de productos que están en oferta.
   */
  public productsOnSale: Product[];

  /**
   * Título: Productos mejor valorados
   * Descripción: Lista de productos mejor valorados.
   */
  public productsBestRated: Product[];

  /**
   * Título: Promociones
   * Descripción: Lista de promociones.
   */
  public promos: Promo[];

  /**
   * Título: Constructor de HomeComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios de mensajes, caché de productos, productos y promociones.
   * @param messageService Servicio que gestiona la visualización de mensajes.
   * @param productsCache Servicio que gestiona la caché de productos.
   * @param productService Servicio que gestiona las operaciones de productos.
   * @param promoService Servicio que gestiona las operaciones de promociones.
   */
  constructor(
    private messageService: MessageService,
    private productsCache: ProductsCacheService,
    private productService: ProductService,
    private promoService: PromoService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura la obtención de productos y promociones.
   */
  ngOnInit() {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.products = <Product[]>products;
      });

    this.productService
      .getFeaturedProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (products) => {
          this.productsFeatured = products;
        },
        (err) => console.error(err)
      );

    this.productService
      .getProductsByDate(3)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (products) => {
          this.productsNewArrivals = products;
        },
        (err) => console.error(err)
      );

    this.productService
      .getProductsByRating(3)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (products) => {
          this.productsBestRated = products;
        },
        (err) => console.error(err)
      );

    this.productService
      .getProductsQuery('sale', true, 3)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (products) => {
          this.productsOnSale = products;
        },
        (err) => console.error(err)
      );

    this.promoService
      .getPromos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((promos) => {
        this.promos = promos;
      });
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
