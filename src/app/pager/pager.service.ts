/**
 * Título: Servicio PagerService
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio proporciona la lógica para calcular la paginación de elementos.
 */
import { Injectable } from "@angular/core";

@Injectable()
export class PagerService {
  /**
   * Título: Obtener Paginación
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Calcula los parámetros de paginación para una lista de elementos.
   * @param totalItems Número total de elementos.
   * @param currentPage Página actual (por defecto es 1).
   * @param pageSize Tamaño de página (por defecto es 10).
   * @returns Un objeto con todas las propiedades de paginación requeridas por la vista.
   */
  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10
  ) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;

    if (totalPages <= 10) {
      // Menos de 10 páginas en total, se muestran todas
      startPage = 1;
      endPage = totalPages;
    } else {
      // Más de 10 páginas en total, se calculan las páginas de inicio y fin
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // Calcular los índices de inicio y fin de los elementos
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // Crear un array de páginas para ng-repeat en el control de paginación
    const pages = Array.from(Array(totalPages), (_, i) => 1 + i);

    // Devolver un objeto con todas las propiedades de paginación requeridas por la vista
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
