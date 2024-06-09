/**
 * Título: Servicio ProductService
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este servicio gestiona las operaciones CRUD para productos, incluyendo la lógica para la obtención, creación, actualización y eliminación de productos. También maneja la carga y eliminación de archivos relacionados con productos.
 */
import { combineLatest as observableCombineLatest, Observable, from as fromPromise, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../../account/shared/auth.service';
import { FileUploadService } from './file-upload.service';
import { MessageService } from '../../messages/message.service';
import { ProductRatingService } from './product-rating.service';
import { Product } from '../../models/product.model';
import { ProductsUrl } from './productsUrl';

@Injectable()
export class ProductService {
  private productsUrl = ProductsUrl.productsUrl;

  /**
   * Constructor de ProductService
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios necesarios para gestionar los productos y las operaciones relacionadas.
   * @param messageService Servicio para mostrar mensajes al usuario.
   * @param angularFireDatabase Servicio para interactuar con la base de datos de Firebase.
   * @param authService Servicio de autenticación.
   * @param uploadService Servicio de carga de archivos.
   * @param productRatingService Servicio para gestionar las calificaciones de productos.
   */
  constructor(
    private messageService: MessageService,
    private angularFireDatabase: AngularFireDatabase,
    public authService: AuthService,
    private uploadService: FileUploadService,
    private productRatingService: ProductRatingService
  ) {}

  /**
   * Log a ProductService message with the MessageService
   * @param message Mensaje a registrar.
   */
  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation Nombre de la operación que falló.
   * @param result Valor opcional para devolver como resultado observable.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Obtener productos
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Recupera la lista de productos de la base de datos.
   * @returns Observable con la lista de productos.
   */
  public getProducts(): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) => ref.orderByChild('date'))
      .valueChanges()
      .pipe(map((arr) => arr.reverse()), catchError(this.handleError<Product[]>(`getProducts`)));
  }

  /**
   * Consultar productos por un criterio específico
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Recupera productos que coinciden con un criterio específico.
   * @param byChild Criterio de consulta.
   * @param equalTo Valor que debe coincidir con el criterio.
   * @param limitToFirst Número máximo de productos a recuperar.
   * @returns Observable con la lista de productos.
   */
  public getProductsQuery(
    byChild: string,
    equalTo: string | boolean,
    limitToFirst: number
  ): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref
          .orderByChild(byChild)
          .equalTo(equalTo)
          .limitToFirst(limitToFirst)
      )
      .valueChanges()
      .pipe(catchError(this.handleError<Product[]>(`getProductsQuery`)));
  }

  /**
   * Buscar productos por término
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Busca productos que coincidan con un término dado.
   * @param term Término de búsqueda.
   * @returns Observable con la lista de productos encontrados.
   */
  public findProducts(term): Observable<any> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref
          .orderByChild('name')
          .startAt(term)
          .endAt(term + '\uf8ff')
      )
      .valueChanges()
      .pipe(catchError(this.handleError<Product[]>(`getProductsQuery`)));
  }

  /**
   * Obtener productos por fecha
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Recupera productos ordenados por fecha.
   * @param limitToLast Número máximo de productos a recuperar.
   * @returns Observable con la lista de productos.
   */
  public getProductsByDate(limitToLast: number): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref.orderByChild('date').limitToLast(limitToLast)
      )
      .valueChanges()
      .pipe(
        map((arr) => arr.reverse()),
        catchError(this.handleError<Product[]>(`getProductsByDate`))
      );
  }

  /**
   * Obtener productos por calificación
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Recupera productos ordenados por calificación.
   * @param limitToLast Número máximo de productos a recuperar.
   * @returns Observable con la lista de productos.
   */
  public getProductsByRating(limitToLast: number): Observable<Product[]> {
    return this.angularFireDatabase
      .list<Product>('products', (ref) =>
        ref.orderByChild('currentRating').limitToLast(limitToLast)
      )
      .valueChanges()
      .pipe(map((arr) => arr.reverse()), catchError(this.handleError<Product[]>(`getProductsByRating`)));
  }

  /**
   * Obtener productos destacados
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Recupera la lista de productos destacados.
   * @returns Observable con la lista de productos destacados.
   */
  public getFeaturedProducts(): Observable<any[]> {
    return this.angularFireDatabase
      .list<Product>('featured')
      .snapshotChanges()
      .pipe(
        switchMap(
          (actions) => {
            return observableCombineLatest(
              actions.map((action) => this.getProduct(action.key))
            );
          },
          (actionsFromSource, resolvedProducts) => {
            resolvedProducts.map((product, i) => {
              product['imageFeaturedUrl'] = actionsFromSource[
                i
                ].payload.val().imageFeaturedUrl;
              return product;
            });
            return resolvedProducts;
          }
        ),
        catchError(this.handleError<Product[]>(`getFeaturedProducts`))
      );
  }

  /**
   * Obtener producto por ID
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Recupera un producto específico por su ID.
   * @param id Identificador del producto.
   * @returns Observable con el producto encontrado.
   */
  public getProduct(id: any): Observable<Product | null> {
    const url = `${this.productsUrl}/${id}`;
    return this.angularFireDatabase
      .object<Product>(url)
      .valueChanges()
      .pipe(
        tap((result) => {
          if (result) {
            return of(result);
          } else {
            this.messageService.addError(`Found no Product with id=${id}`);
            return of(null);
          }
        }),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  /**
   * Actualizar producto
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Actualiza los detalles de un producto.
   * @param data Datos del producto y archivos asociados.
   * @returns Observable con el producto actualizado.
   */
  public updateProduct(data: { product: Product; files: FileList }) {
    const url = `${this.productsUrl}/${data.product.id}`;

    if (!data.files.length) {
      return this.updateProductWithoutNewImage(data.product, url);
    }

    const dbOperation = this.uploadService
      .startUpload(data)
      .then(async (task) => {
        const downloadUrl = await task.ref.getDownloadURL();
        data.product.imageURLs[0] = downloadUrl;
        data.product.imageRefs[0] = task.ref.fullPath;

        return data;
      })
      .then((dataWithImagePath) => {
        return this.angularFireDatabase
          .object<Product>(url)
          .update(data.product);
      })
      .then((response) => {
        this.log(`Updated Product ${data.product.name}`);
        return data.product;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
    return fromPromise(dbOperation);
  }

  /**
   * Actualizar producto sin nueva imagen
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Actualiza los detalles de un producto sin cambiar las imágenes.
   * @param product Producto a actualizar.
   * @param url URL del producto en la base de datos.
   * @returns Observable con el producto actualizado.
   */
  private updateProductWithoutNewImage(product: Product, url: string) {
    const dbOperation = this.angularFireDatabase
      .object<Product>(url)
      .update(product)
      .then((response) => {
        this.log(`Updated Product ${product.name}`);
        return product;
      })
      .catch((error) => {
        this.handleError(error);
        return error;
      });
    return fromPromise(dbOperation);
  }

  /**
   * Añadir producto
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Añade un nuevo producto a la base de datos.
   * @param data Datos del producto y archivos asociados.
   * @returns Observable con el producto añadido.
   */
  public addProduct(data: { product: Product; files: FileList }) {
    const dbOperation = this.uploadService
      .startUpload(data)
      .then(async (task) => {
        const downloadUrl = await task.ref.getDownloadURL();
        data.product.imageURLs.push(downloadUrl);
        data.product.imageRefs.push(task.ref.fullPath);

        return this.angularFireDatabase
          .list('products')
          .set(data.product.id.toString(), data.product);
      }, (error) => error)
      .then((response) => {
        this.log(`Added Product ${data.product.name}`);
        return data.product;
      })
      .catch((error) => {
        this.messageService.addError(
          `Add Failed, Product ${data.product.name}`
        );
        this.handleError(error);
        return error;
      });
    return fromPromise(dbOperation);
  }

  /**
   * Eliminar producto
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Elimina un producto de la base de datos.
   * @param product Producto a eliminar.
   * @returns Observable con el resultado de la operación de eliminación.
   */
  public deleteProduct(product: Product) {
    const url = `${this.productsUrl}/${product.id}`;

    this.uploadService.deleteFile(product.imageRefs);

    return this.angularFireDatabase
      .object<Product>(url)
      .remove()
      .then(() => this.log('success deleting ' + product.name))
      .catch((error) => {
        this.messageService.addError('Delete failed ' + product.name);
        this.handleError('delete product');
      });
  }
}
