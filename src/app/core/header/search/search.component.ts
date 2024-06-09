/**
 * Título: Componente Search
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la búsqueda de productos. Implementa OnInit para inicializar el componente y manejar la lógica de búsqueda.
 */
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

import { ProductService } from '../../../products/shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  /**
   * Título: Productos
   * Descripción: Lista de productos encontrados en la búsqueda.
   */
  products: any[];

  /**
   * Título: Término de búsqueda
   * Descripción: Sujeto que emite el término de búsqueda ingresado por el usuario.
   */
  term$ = new Subject<string>();

  /**
   * Título: Mostrar búsqueda
   * Descripción: Indica si la búsqueda debe ser mostrada.
   */
  @Input() showSearch: boolean;

  /**
   * Título: Evento para ocultar búsqueda
   * Descripción: Evento emitido cuando se oculta la búsqueda.
   */
  @Output() onHideSearch = new EventEmitter<boolean>();

  /**
   * Título: Constructor de SearchComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de productos.
   * @param productService Servicio que gestiona las operaciones de productos.
   */
  constructor(private productService: ProductService) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura la lógica de búsqueda utilizando RxJS.
   */
  ngOnInit() {
    this.term$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((term) => term.length > 0),
        switchMap((term) => this.search(term))
      )
      .subscribe((results) => {
        this.products = results;
      });
  }

  /**
   * Título: search
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que realiza la búsqueda de productos.
   * @param term Término de búsqueda ingresado por el usuario.
   * @returns Observable con los resultados de la búsqueda.
   */
  public search(term: string) {
    return this.productService.findProducts(term);
  }

  /**
   * Título: onSearchInput
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja la entrada del usuario en el campo de búsqueda.
   * @param event Evento del input.
   */
  public onSearchInput(event) {
    let term = event.target.value;
    if (term.length > 0) {
      term = term.charAt(0).toUpperCase() + term.slice(1);
      this.term$.next(term);
    } else {
      this.products = [];
      this.term$.next('');
    }
  }

  /**
   * Título: onCloseSearch
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el cierre de la búsqueda.
   */
  public onCloseSearch() {
    this.showSearch = false;
    this.onHideSearch.emit(false);
  }
}

