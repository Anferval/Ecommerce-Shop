/**
 * Título: Componente AddEdit
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona la adición y edición de productos. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

import { MessageService } from '../../messages/message.service';
import { FileUploadService } from '../../products/shared/file-upload.service';
import { ProductService } from '../../products/shared/product.service';
import { ProductsCacheService } from '../../products/shared/products-cache.service';

import { Product } from '../../models/product.model';

/**
 * Título: DomainProduct
 * Descripción: Extensión del modelo de Producto para incluir categorías.
 */
export class DomainProduct extends Product {
  categories: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, OnDestroy {
  /**
   * Título: Suscripción de producto
   * Descripción: Suscripción al observable que proporciona los datos del producto.
   */
  private productSubscription: Subscription;

  /**
   * Título: Suscripción del formulario
   * Descripción: Suscripción a los cambios en los valores del formulario.
   */
  private formSubscription: Subscription;

  /**
   * Título: Referencia a las fotos
   * Descripción: Referencia al input de fotos en la plantilla.
   */
  @ViewChild('photos', { static: true }) photos;

  /**
   * Título: Formulario de producto
   * Descripción: Formulario reactivo que gestiona los datos del producto.
   */
  public productForm: UntypedFormGroup;

  /**
   * Título: Producto
   * Descripción: Modelo de datos del producto.
   */
  public product: DomainProduct;

  /**
   * Título: Modo de operación
   * Descripción: Indica si el componente está en modo de adición o edición.
   */
  public mode: 'edit' | 'add';

  /**
   * Título: ID del producto
   * Descripción: Identificador del producto en modo de edición.
   */
  public id;

  /**
   * Título: Porcentaje de subida de archivos
   * Descripción: Observable que emite el porcentaje de subida de archivos.
   */
  public percentage: Observable<number>;

  /**
   * Título: Constructor de AddEditComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa los servicios necesarios.
   * @param router Servicio de enrutamiento.
   * @param route Servicio de rutas activadas.
   * @param productService Servicio de productos.
   * @param fileUploadService Servicio de subida de archivos.
   * @param productsCacheService Servicio de caché de productos.
   * @param log Servicio de mensajes.
   */
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private productService: ProductService,
    public fileUploadService: FileUploadService,
    private productsCacheService: ProductsCacheService,
    private log: MessageService
  ) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Configura el producto y el formulario.
   */
  ngOnInit(): void {
    this.setProduct();
  }

  /**
   * Título: initForm
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el formulario reactivo con los controles y validadores necesarios.
   */
  private initForm() {
    this.productForm = new UntypedFormGroup({
      name: new UntypedFormControl(
        this.product && this.product.name,
        Validators.required
      ),
      id: new UntypedFormControl(
        {
          value: this.product && this.product.id,
          disabled: true
        },
        [Validators.required, Validators.min(0)]
      ),
      date: new UntypedFormControl(
        this.product && this.product.date,
        Validators.required
      ),
      categories: new UntypedFormControl(
        this.product && this.product.categories,
        Validators.required
      ),
      description: new UntypedFormControl(
        this.product && this.product.description,
        Validators.required
      ),
      price: new UntypedFormControl(this.product && this.product.price, [
        Validators.required,
        Validators.min(0)
      ]),
      priceNormal: new UntypedFormControl(this.product && this.product.priceNormal, [
        Validators.required,
        Validators.min(0)
      ])
    });
    this.onFormChanges();
  }

  /**
   * Título: setProduct
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Configura el producto en base a la ruta activa y el modo (adición o edición).
   */
  private setProduct() {
    this.route.params.subscribe((params: Params) => {
      this.id = +this.route.snapshot.paramMap.get('id');
      // if we have an id, we're in edit mode
      if (this.id) {
        this.mode = 'edit';
        this.getProduct(this.id);
        this.initForm();
      } else {
        // else we are in add mode
        this.mode = 'add';
        this.constructProduct();
        this.initForm();
      }
    });
  }

  /**
   * Título: constructProduct
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Construye un producto mock para el modo de adición.
   */
  private constructProduct() {
    const product = this.constructMockProduct();
    product.categories = this.categoriesFromObjectToString(product.categories);
    this.syncProduct(product);
    this.initForm();
  }

  /**
   * Título: getProduct
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Obtiene un producto existente desde el servicio de productos.
   * @param id Identificador del producto a obtener.
   */
  private getProduct(id): void {
    this.productSubscription = this.productService
      .getProduct(id)
      .subscribe((product) => {
        if (product) {
          product.categories = this.categoriesFromObjectToString(
            product.categories
          );
          this.syncProduct(product);
          this.initForm();
        }
      });
  }

  /**
   * Título: onFormChanges
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Suscribe a los cambios en el formulario para sincronizar el producto.
   */
  private onFormChanges() {
    this.formSubscription = this.productForm.valueChanges.subscribe(
      (formFieldValues) => {
        const product = { ...this.product, ...formFieldValues };
        this.syncProduct(product);
      }
    );
  }

  /**
   * Título: syncProduct
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Sincroniza el producto con los valores del formulario.
   * @param product Datos del producto a sincronizar.
   */
  private syncProduct(product): void {
    const id = this.createId(product);
    const imageURLs = this.handleImageURLs(product);
    const reduction = this.calculateReduction(
      product.priceNormal,
      product.price
    );
    const sale = this.checkForSale(reduction);

    this.product = {
      ...product,
      sale,
      reduction,
      id,
      imageURLs
    };
  }

  /**
   * Título: onSubmit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al enviar el formulario. Gestiona la adición o actualización del producto.
   */
  public onSubmit() {
    this.syncProduct({ ...this.product, ...this.productForm.value });
    const productToSubmit = this.constructProductToSubmit(this.product);
    const files: FileList = this.photos.nativeElement.files;
    if (this.mode === 'add' && files.length > 0) {
      this.addProduct(productToSubmit, files);
    } else if (this.mode === 'edit') {
      this.updateProduct(productToSubmit, files);
    } else {
      this.log.addError('Please provide a file for your product');
      return;
    }
  }

  /**
   * Título: addProduct
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Añade un nuevo producto utilizando el servicio de productos.
   * @param product Datos del producto a añadir.
   * @param files Archivos del producto a subir.
   */
  private addProduct(product: Product, files: FileList) {
    this.productService.addProduct({ product, files }).subscribe(
      (savedProduct: Product) => {
        if (savedProduct.id) {
          this.product = null;
          this.router.navigate(['/products']);
        }
      },
      (error) => {
        this.log.addError('Could not upload your product');
        return of(error);
      }
    );
  }

  /**
   * Título: updateProduct
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Actualiza un producto existente utilizando el servicio de productos.
   * @param product Datos del producto a actualizar.
   * @param files Archivos del producto a subir (opcional).
   */
  private updateProduct(product: Product, files?: FileList) {
    this.productSubscription.unsubscribe();
    this.productService.updateProduct({ product, files }).subscribe(
      (response: Product) => {
        this.router.navigate(['/products/' + response.id]);
      },
      (error) => this.log.addError('Could not update your product')
    );
  }

  /**
   * Título: onDelete
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Elimina un producto existente.
   */
  public onDelete() {
    if (this.mode === 'edit') {
      this.productSubscription.unsubscribe();
      this.productService.deleteProduct(this.product).then((res) => {
        this.router.navigate(['/products']);
      });
    } else {
      this.log.addError(`Cannot delete new product`);
    }
  }

  // pure helper functions start here:

  /**
   * Título: constructMockProduct
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Construye un producto mock para inicializar el formulario en modo de adición.
   * @returns Product
   */
  private constructMockProduct() {
    return new Product();
  }

  /**
   * Título: constructProductToSubmit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Construye un producto listo para ser enviado al servidor.
   * @param product Datos del producto a construir.
   * @returns Product
   */
  private constructProductToSubmit(product: DomainProduct): Product {
    return {
      ...product,
      categories: this.categoriesFromStringToObject(product.categories)
    };
  }

  /**
   * Título: createId
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Crea un ID único para el producto.
   * @param product Datos del producto.
   * @returns number
   */
  private createId(product: Product): number {
    const randomId = Math.floor(Math.random() * new Date().getTime());
    let id = product.id || randomId;
    if (id === 1) {
      id = randomId;
    }
    return id;
  }

  /**
   * Título: categoriesFromObjectToString
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Convierte un objeto de categorías a una cadena.
   * @param categories Objeto de categorías.
   * @returns string | null
   */
  private categoriesFromObjectToString(categories: {}): string | null {
    // categories: { key: true, key: true} || {}
    if (Object.keys(categories).length === 0) {
      return 'example, category';
    }
    return Object.keys(categories).reduce(
      (result, currentProduct, index, inputArray) => {
        if (index < inputArray.length - 1) {
          return result + currentProduct + ',';
        }
        return result + currentProduct;
      },
      ''
    );
  }

  /**
   * Título: categoriesFromStringToObject
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Convierte una cadena de categorías a un objeto.
   * @param categories Cadena de categorías.
   * @returns {}
   */
  private categoriesFromStringToObject(categories: string): {} {
    // categories: 'cat1, cat2, cat3' || ''
    if (categories.length === 0) {
      return {};
    }
    return categories
      .split(',')
      .reduce((combinedCategories, currentCategory) => {
        combinedCategories[currentCategory.trim()] = true;
        return combinedCategories;
      }, {});
  }

  /**
   * Título: checkForSale
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Verifica si hay una oferta en el producto.
   * @param reduction Reducción en el precio del producto.
   * @returns boolean
   */
  private checkForSale(reduction: number): boolean {
    return reduction > 0;
  }

  /**
   * Título: calculateReduction
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Calcula la reducción en el precio del producto.
   * @param priceNormal Precio normal del producto.
   * @param price Precio actual del producto.
   * @returns number
   */
  private calculateReduction(priceNormal: number, price: number): number {
    const reduction = Math.round((priceNormal - price) / priceNormal * 100);
    return reduction > 0 ? reduction : 0;
  }

  /**
   * Título: handleImageURLs
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja las URLs de las imágenes del producto.
   * @param product Datos del producto.
   * @returns string[]
   */
  private handleImageURLs(product: Product): string[] {
    if (product.imageURLs && product.imageURLs.length > 0) {
      return product.imageURLs;
    }
    return [];
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela las suscripciones a los observables.
   */
  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }
}

