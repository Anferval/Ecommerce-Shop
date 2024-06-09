/**
 * Título: Componente PageTitle
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente muestra el título de la página y los enlaces de navegación relacionados.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {
  /**
   * Título: Título de la página
   * Descripción: Título a mostrar en la página.
   */
  @Input() public title: string;

  /**
   * Título: Enlaces hijos
   * Descripción: Lista de enlaces de navegación relacionados con la página actual.
   */
  @Input() public children: {title: string, link: string}[];
}
