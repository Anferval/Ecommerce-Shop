/**
 * Título: Módulo Core
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este módulo centraliza los servicios y componentes fundamentales para la aplicación. Incluye la configuración de proveedores y la protección contra la carga múltiple del módulo.
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxSiemaModule } from 'ngx-siema';

import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { NavigationOffCanvasComponent } from './navigation-off-canvas/navigation-off-canvas.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './content/footer/footer.component';
import { NavigationMainComponent } from './header/navigation-main/navigation-main.component';
import { ToolbarCartComponent } from './header/toolbar/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MainSliderComponent } from './home/main-slider/main-slider.component';
import { ProductWidgetComponent } from './home/product-widget/product-widget.component';
import { PromoComponent } from './home/promo/promo.component';
import { SearchComponent } from './header/search/search.component';

import { ProductService } from '../products/shared/product.service';
import { MessageService } from '../messages/message.service';
import { CartService } from '../cart/shared/cart.service';
import { PagerService } from '../pager/pager.service';
import { OrderService } from '../account/orders/shared/order.service';
import { CheckoutService } from '../checkout/shared/checkout.service';
import { AuthService } from '../account/shared/auth.service';
import { OffcanvasService } from './shared/offcanvas.service';
import { PromoService } from './shared/promo.service';
import { UiService } from '../products/shared/ui.service';
import { ProductsCacheService } from '../products/shared/products-cache.service';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  declarations: [
    /**
     * Título: Componente Content
     * Descripción: Componente que gestiona el contenido principal de la aplicación.
     */
    ContentComponent,

    /**
     * Título: Componente Header
     * Descripción: Componente que gestiona el encabezado de la aplicación.
     */
    HeaderComponent,

    /**
     * Título: Componente NavigationOffCanvas
     * Descripción: Componente que gestiona la navegación offcanvas.
     */
    NavigationOffCanvasComponent,

    /**
     * Título: Componente TopBar
     * Descripción: Componente que representa la barra superior de la aplicación.
     */
    TopBarComponent,

    /**
     * Título: Componente Footer
     * Descripción: Componente que gestiona el pie de página de la aplicación.
     */
    FooterComponent,

    /**
     * Título: Componente NavigationMain
     * Descripción: Componente que gestiona la navegación principal de la aplicación.
     */
    NavigationMainComponent,

    /**
     * Título: Componente ToolbarCart
     * Descripción: Componente que gestiona el carrito de compras en la barra de herramientas.
     */
    ToolbarCartComponent,

    /**
     * Título: Componente Home
     * Descripción: Componente que gestiona la página principal de la aplicación.
     */
    HomeComponent,

    /**
     * Título: Componente MainSlider
     * Descripción: Componente que gestiona el carrusel de imágenes principal.
     */
    MainSliderComponent,

    /**
     * Título: Componente ProductWidget
     * Descripción: Componente que muestra una lista de productos en forma de widget.
     */
    ProductWidgetComponent,

    /**
     * Título: Componente Promo
     * Descripción: Componente que muestra una promoción.
     */
    PromoComponent,

    /**
     * Título: Componente Search
     * Descripción: Componente que gestiona la búsqueda de productos.
     */
    SearchComponent
  ],
  imports: [
    /**
     * Título: CommonModule
     * Descripción: Módulo que proporciona las directivas comunes de Angular.
     */
    CommonModule,

    /**
     * Título: SharedModule
     * Descripción: Módulo que proporciona componentes, directivas y servicios compartidos en la aplicación.
     */
    SharedModule,

    /**
     * Título: NgxSiemaModule
     * Descripción: Módulo que proporciona el carrusel ngx-siema configurado.
     */
    NgxSiemaModule.forRoot()
  ],
  exports: [
    /**
     * Título: CommonModule
     * Descripción: Exporta el CommonModule para que esté disponible en otros módulos.
     */
    CommonModule,

    /**
     * Título: SharedModule
     * Descripción: Exporta el SharedModule para que esté disponible en otros módulos.
     */
    SharedModule,

    /**
     * Título: NavigationOffCanvasComponent
     * Descripción: Exporta el NavigationOffCanvasComponent para que esté disponible en otros módulos.
     */
    NavigationOffCanvasComponent,

    /**
     * Título: TopBarComponent
     * Descripción: Exporta el TopBarComponent para que esté disponible en otros módulos.
     */
    TopBarComponent,

    /**
     * Título: HeaderComponent
     * Descripción: Exporta el HeaderComponent para que esté disponible en otros módulos.
     */
    HeaderComponent,

    /**
     * Título: ContentComponent
     * Descripción: Exporta el ContentComponent para que esté disponible en otros módulos.
     */
    ContentComponent
  ],
  providers: [
    /**
     * Título: ProductService
     * Descripción: Servicio que gestiona las operaciones de productos.
     */
    ProductService,

    /**
     * Título: ProductsCacheService
     * Descripción: Servicio que gestiona la caché de productos.
     */
    ProductsCacheService,

    /**
     * Título: MessageService
     * Descripción: Servicio que gestiona la visualización de mensajes.
     */
    MessageService,

    /**
     * Título: CartService
     * Descripción: Servicio que gestiona las operaciones del carrito de compras.
     */
    CartService,

    /**
     * Título: PagerService
     * Descripción: Servicio que gestiona la paginación.
     */
    PagerService,

    /**
     * Título: OrderService
     * Descripción: Servicio que gestiona las operaciones de pedidos.
     */
    OrderService,

    /**
     * Título: CheckoutService
     * Descripción: Servicio que gestiona el proceso de checkout.
     */
    CheckoutService,

    /**
     * Título: AuthService
     * Descripción: Servicio que gestiona la autenticación de usuarios.
     */
    AuthService,

    /**
     * Título: OffcanvasService
     * Descripción: Servicio que gestiona la navegación offcanvas.
     */
    OffcanvasService,

    /**
     * Título: PromoService
     * Descripción: Servicio que gestiona las operaciones de promociones.
     */
    PromoService,

    /**
     * Título: UiService
     * Descripción: Servicio que gestiona la interfaz de usuario.
     */
    UiService
  ]
})
export class CoreModule {
  /**
   * Título: Constructor de CoreModule
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Evita la carga múltiple del módulo CoreModule.
   * @param parentModule Instancia del módulo padre.
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
