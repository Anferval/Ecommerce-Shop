/**
 * Título: Módulo Checkout
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este módulo gestiona todos los componentes relacionados con el proceso de checkout, incluyendo la dirección, envío, pago, revisión y finalización del pedido.
 */
import { NgModule } from '@angular/core';
import { AddressComponent } from './address/address.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';

@NgModule({
  declarations: [
    /**
     * Título: Componente Checkout
     * Descripción: Componente principal que gestiona el proceso de checkout.
     */
    CheckoutComponent,

    /**
     * Título: Componente Address
     * Descripción: Componente que gestiona la entrada de la dirección de envío durante el proceso de checkout.
     */
    AddressComponent,

    /**
     * Título: Componente Footer
     * Descripción: Componente que representa el pie de página del proceso de checkout.
     */
    FooterComponent,

    /**
     * Título: Componente Payment
     * Descripción: Componente que gestiona la selección del método de pago durante el proceso de checkout.
     */
    PaymentComponent,

    /**
     * Título: Componente Review
     * Descripción: Componente que gestiona la revisión final del pedido antes de su finalización.
     */
    ReviewComponent,

    /**
     * Título: Componente Shipping
     * Descripción: Componente que gestiona la selección del método de envío durante el proceso de checkout.
     */
    ShippingComponent,

    /**
     * Título: Componente Sidebar
     * Descripción: Componente que muestra el resumen del carrito de compras en la barra lateral durante el proceso de checkout.
     */
    SidebarComponent,

    /**
     * Título: Componente Complete
     * Descripción: Componente que representa la pantalla de finalización del proceso de checkout.
     */
    CompleteComponent
  ],
  imports: [
    /**
     * Título: SharedModule
     * Descripción: Módulo que proporciona componentes, directivas y servicios compartidos en la aplicación.
     */
    SharedModule,

    /**
     * Título: FormsModule
     * Descripción: Módulo que proporciona directivas y servicios para el manejo de formularios en Angular.
     */
    FormsModule,

    /**
     * Título: ReactiveFormsModule
     * Descripción: Módulo que proporciona soporte para formularios reactivos en Angular.
     */
    ReactiveFormsModule
  ],
  exports: [
    /**
     * Título: SharedModule
     * Descripción: Exporta el SharedModule para que esté disponible en otros módulos.
     */
    SharedModule,

    /**
     * Título: CheckoutComponent
     * Descripción: Exporta el CheckoutComponent para que esté disponible en otros módulos.
     */
    CheckoutComponent,

    /**
     * Título: AddressComponent
     * Descripción: Exporta el AddressComponent para que esté disponible en otros módulos.
     */
    AddressComponent,

    /**
     * Título: FooterComponent
     * Descripción: Exporta el FooterComponent para que esté disponible en otros módulos.
     */
    FooterComponent,

    /**
     * Título: PaymentComponent
     * Descripción: Exporta el PaymentComponent para que esté disponible en otros módulos.
     */
    PaymentComponent,

    /**
     * Título: ReviewComponent
     * Descripción: Exporta el ReviewComponent para que esté disponible en otros módulos.
     */
    ReviewComponent,

    /**
     * Título: ShippingComponent
     * Descripción: Exporta el ShippingComponent para que esté disponible en otros módulos.
     */
    ShippingComponent,

    /**
     * Título: SidebarComponent
     * Descripción: Exporta el SidebarComponent para que esté disponible en otros módulos.
     */
    SidebarComponent,

    /**
     * Título: FormsModule
     * Descripción: Exporta el FormsModule para que esté disponible en otros módulos.
     */
    FormsModule,

    /**
     * Título: ReactiveFormsModule
     * Descripción: Exporta el ReactiveFormsModule para que esté disponible en otros módulos.
     */
    ReactiveFormsModule
  ]
})
export class CheckoutModule {}
