/**
 * Título: Clase Promo
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Esta clase representa una promoción, incluyendo detalles como encabezados, URL de imagen, texto del botón y enlace.
 */
export class Promo {
  /**
   * Título: Pre-encabezado
   * Descripción: Texto que aparece antes del encabezado principal.
   * Opcional.
   */
  public preHeading?: string;

  /**
   * Título: Encabezado
   * Descripción: Texto principal de la promoción.
   */
  public heading: string;

  /**
   * Título: Después del encabezado
   * Descripción: Texto que aparece después del encabezado principal.
   * Opcional.
   */
  public afterHeading?: string;

  /**
   * Título: URL de la imagen
   * Descripción: URL de la imagen de la promoción.
   */
  public imageUrl: string;

  /**
   * Título: Texto del botón
   * Descripción: Texto que aparece en el botón de la promoción.
   * Opcional.
   */
  public buttonText?: string;

  /**
   * Título: Enlace
   * Descripción: URL a la que redirige el botón de la promoción.
   * Opcional.
   */
  public link?: string;
}
