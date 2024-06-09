/**
 * Título: Componente Footer
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Este componente representa el pie de página del proceso de checkout, proporcionando botones para navegar hacia atrás, continuar y completar el pedido.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /**
   * Título: Botones
   * Descripción: Lista de botones a mostrar en el pie de página.
   */
  @Input() buttons: string[];

  /**
   * Título: Continuar habilitado
   * Descripción: Indica si el botón de continuar está habilitado.
   */
  @Input() continueEnabled: boolean;

  /**
   * Título: Evento para retroceder
   * Descripción: Evento emitido cuando se hace clic en el botón de retroceder.
   */
  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Título: Evento para continuar
   * Descripción: Evento emitido cuando se hace clic en el botón de continuar.
   */
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Título: Evento para completar el pedido
   * Descripción: Evento emitido cuando se hace clic en el botón de completar pedido.
   */
  @Output() completeOrder: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Título: onBack
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de clic en el botón de retroceder y emite el evento correspondiente.
   * @param e Evento del clic.
   */
  onBack(e: Event) {
    this.back.emit();
  }

  /**
   * Título: onContinue
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de clic en el botón de continuar y emite el evento correspondiente.
   * @param e Evento del clic.
   */
  onContinue(e: Event) {
    this.continue.emit();
  }

  /**
   * Título: onCompleteOrder
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Maneja el evento de clic en el botón de completar pedido y emite el evento correspondiente.
   * @param e Evento del clic.
   */
  onCompleteOrder(e: Event) {
    this.completeOrder.emit();
  }
}
