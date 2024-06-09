/**
 * Título: Módulo Account
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este módulo gestiona todos los componentes relacionados con la cuenta del usuario, incluyendo perfil, órdenes, registro y login.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    /**
     * Título: Componente Account
     * Descripción: Componente principal que gestiona la cuenta del usuario.
     */
    AccountComponent,

    /**
     * Título: Componente Profile
     * Descripción: Componente que gestiona el perfil del usuario.
     */
    ProfileComponent,

    /**
     * Título: Componente Orders
     * Descripción: Componente que gestiona las órdenes del usuario.
     */
    OrdersComponent,

    /**
     * Título: Componente RegisterLogin
     * Descripción: Componente que gestiona el registro y login del usuario.
     */
    RegisterLoginComponent
  ],
  imports: [
    /**
     * Título: CommonModule
     * Descripción: Módulo que proporciona las directivas y servicios comunes de Angular.
     */
    CommonModule,

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
    SharedModule
  ]
})
export class AccountModule {}
