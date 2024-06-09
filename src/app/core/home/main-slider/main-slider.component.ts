/**
 * Título: Componente MainSlider
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente gestiona el carrusel de imágenes principal utilizando ngx-siema. Implementa OnInit para inicializar el componente y OnDestroy para limpiar las suscripciones cuando el componente se destruye.
 */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit, OnDestroy {
  /**
   * Título: Unsubscribe$
   * Descripción: Sujeto utilizado para cancelar suscripciones y evitar fugas de memoria.
   */
  private unsubscribe$ = new Subject();

  /**
   * Título: Elementos del slider
   * Descripción: Lista de elementos a mostrar en el carrusel.
   */
  @Input() public items: any[];

  /**
   * Título: Diapositiva actual
   * Descripción: Índice de la diapositiva actualmente visible.
   */
  public currentSlide: number;

  /**
   * Título: Imágenes cargadas
   * Descripción: Lista de URLs de imágenes que se han cargado correctamente.
   */
  public imagesLoaded: string[];

  /**
   * Título: Opciones de ngx-siema
   * Descripción: Configuración para el carrusel ngx-siema.
   */
  public options: NgxSiemaOptions = {
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: false,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: () => {
      // runs after slide change
    }
  };

  /**
   * Título: Constructor de MainSliderComponent
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa el servicio de ngx-siema.
   * @param ngxSiemaService Servicio que gestiona las operaciones del carrusel ngx-siema.
   */
  constructor(private ngxSiemaService: NgxSiemaService) {}

  /**
   * Título: ngOnInit
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al inicializar el componente. Inicializa la diapositiva actual y la lista de imágenes cargadas.
   */
  ngOnInit() {
    this.currentSlide = 0;
    this.imagesLoaded = [];
  }

  /**
   * Título: prev
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Mueve el carrusel a la diapositiva anterior.
   */
  public prev() {
    if (this.currentSlide > 0) {
      this.ngxSiemaService
        .prev(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: any) => {
          this.currentSlide = data.currentSlide;
        });
    }
  }

  /**
   * Título: next
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Mueve el carrusel a la siguiente diapositiva.
   */
  public next() {
    if (this.currentSlide < this.items.length - 1) {
      this.ngxSiemaService
        .next(1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: any) => {
          this.currentSlide = data.currentSlide;
        });
    }
  }

  /**
   * Título: goTo
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Mueve el carrusel a una diapositiva específica.
   * @param index Índice de la diapositiva a la que se desea ir.
   */
  public goTo(index: number) {
    this.ngxSiemaService
      .goTo(index)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.currentSlide = data.currentSlide;
      });
  }

  /**
   * Título: onImageLoad
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de carga de una imagen y añade la URL de la imagen a la lista de imágenes cargadas.
   * @param e Evento de carga de imagen.
   */
  public onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
  }

  /**
   * Título: ngOnDestroy
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Método que se ejecuta al destruir el componente. Cancela las suscripciones a los observables.
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
