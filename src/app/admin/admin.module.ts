/**
 * Título: Módulo Admin
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este módulo gestiona los componentes y servicios relacionados con la administración, incluyendo la adición y edición de productos.
 */
import { NgModule } from '@angular/core';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [
    /**
     * Título: Componente AddEdit
     * Descripción: Componente que gestiona la adición y edición de productos.
     */
    AddEditComponent
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
    ReactiveFormsModule,

    /**
     * Título: ProductsModule
     * Descripción: Módulo que gestiona los componentes y servicios relacionados con los productos.
     */
    ProductsModule
  ],
  exports: [
    /**
     * Título: SharedModule
     * Descripción: Exporta el SharedModule para que esté disponible en otros módulos.
     */
    SharedModule,

    /**
     * Título: ProductsModule
     * Descripción: Exporta el ProductsModule para que esté disponible en otros módulos.
     */
    ProductsModule
  ]
})
export class AdminModule {}
