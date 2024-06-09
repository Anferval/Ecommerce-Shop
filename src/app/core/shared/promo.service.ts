/**
 * Título: Servicio Promo
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio gestiona la obtención de promociones desde la base de datos Firebase.
 */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Observable } from 'rxjs';

import { Promo } from '../../models/promo.model';

@Injectable()
export class PromoService {
  /**
   * Título: Constructor de PromoService
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de base de datos de Firebase.
   * @param angularFireDatabase Servicio de base de datos de Firebase.
   */
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  /**
   * Título: Obtener promociones
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Obtiene una lista de promociones desde la base de datos de Firebase.
   * @returns Observable que emite una lista de promociones.
   */
  getPromos(): Observable<Promo[]> {
    return this.angularFireDatabase.list<Promo>('promos').valueChanges();
  }
}
