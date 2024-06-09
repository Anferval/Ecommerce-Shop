/**
 * Título: Clase Customer
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Esta clase representa un cliente, incluyendo sus detalles personales y de contacto.
 */
export class Customer {
  /**
   * Título: Nombre
   * Descripción: Nombre del cliente.
   */
  public firstname: string;

  /**
   * Título: Apellido
   * Descripción: Apellido del cliente.
   */
  public lastname: string;

  /**
   * Título: Dirección 1
   * Descripción: Primera línea de la dirección del cliente.
   */
  public address1: string;

  /**
   * Título: Dirección 2
   * Descripción: Segunda línea de la dirección del cliente.
   */
  public address2: string;

  /**
   * Título: Código Postal
   * Descripción: Código postal del cliente.
   */
  public zip: number;

  /**
   * Título: Ciudad
   * Descripción: Ciudad del cliente.
   */
  public city: string;

  /**
   * Título: Correo Electrónico
   * Descripción: Correo electrónico del cliente.
   */
  public email: string;

  /**
   * Título: Teléfono
   * Descripción: Número de teléfono del cliente.
   */
  public phone: string;

  /**
   * Título: Compañía
   * Descripción: Nombre de la compañía del cliente.
   */
  public company: string;

  /**
   * Título: País
   * Descripción: País del cliente.
   */
  public country: string;

  /**
   * Título: Constructor de Customer
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa un nuevo cliente con los detalles proporcionados. Los parámetros son opcionales y tienen valores predeterminados.
   * @param firstname Nombre del cliente.
   * @param lastname Apellido del cliente.
   * @param address1 Primera línea de la dirección del cliente.
   * @param address2 Segunda línea de la dirección del cliente.
   * @param zip Código postal del cliente.
   * @param city Ciudad del cliente.
   * @param email Correo electrónico del cliente.
   * @param phone Número de teléfono del cliente.
   * @param company Nombre de la compañía del cliente.
   * @param country País del cliente.
   */
  constructor(
    firstname: string = '',
    lastname: string = '',
    address1: string = '',
    address2: string = '',
    zip: number = null,
    city: string = '',
    email: string = '',
    phone: string = '',
    company: string = '',
    country: string = ''
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.address1 = address1;
    this.address2 = address2;
    this.zip = zip;
    this.city = city;
    this.email = email;
    this.phone = phone;
    this.company = company;
    this.country = country;
  }
}
