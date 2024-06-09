/**
 * Título: Componente Promo
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente muestra una promoción.
 */
import { Component, Input } from '@angular/core';
import { Promo } from '../../../models/promo.model';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent {
  /**
   * Título: Promoción
   * Descripción: Datos de la promoción a mostrar.
   */
  @Input() public promo: Promo;
}
