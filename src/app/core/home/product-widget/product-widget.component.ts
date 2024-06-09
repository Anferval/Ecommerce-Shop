/**
 * Título: Componente ProductWidget
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente muestra una lista de productos en forma de widget.
 */
import { Component, Input } from '@angular/core';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss']
})
export class ProductWidgetComponent {
  /**
   * Título: Productos
   * Descripción: Lista de productos a mostrar en el widget.
   */
  @Input() public products: Product[];

  /**
   * Título: Título del widget
   * Descripción: Título a mostrar en el encabezado del widget.
   */
  @Input() public widgetTitle: string;
}
