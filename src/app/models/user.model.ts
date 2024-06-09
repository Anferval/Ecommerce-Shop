/**
 * Título: Interfaz Roles
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Esta interfaz define los roles de un usuario, indicando si el usuario es administrador.
 */
export interface Roles {
  /**
   * Título: Administrador
   * Descripción: Indica si el usuario tiene el rol de administrador.
   */
  admin: boolean;
}

/**
 * Título: Clase User
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Esta clase representa un usuario, incluyendo detalles como email, URL de foto, roles, nombre, apellido, contraseña, pedidos y UID.
 */
export class User {
  /**
   * Título: Email
   * Descripción: Correo electrónico del usuario.
   */
  public email: string;

  /**
   * Título: URL de la foto
   * Descripción: URL de la foto del usuario.
   * Opcional.
   */
  public photoURL?: string;

  /**
   * Título: Roles
   * Descripción: Roles del usuario.
   * Opcional.
   */
  public roles?: Roles;

  /**
   * Título: Nombre
   * Descripción: Nombre del usuario.
   * Opcional.
   */
  public firstName?: string;

  /**
   * Título: Apellido
   * Descripción: Apellido del usuario.
   * Opcional.
   */
  public lastName?: string;

  /**
   * Título: Contraseña
   * Descripción: Contraseña del usuario.
   * Opcional.
   */
  public password?: string;

  /**
   * Título: Pedidos
   * Descripción: Lista de pedidos realizados por el usuario.
   * Opcional.
   */
  public orders?: object;

  /**
   * Título: Confirmar contraseña
   * Descripción: Campo para confirmar la contraseña del usuario.
   * Opcional.
   */
  public confirmPassword?: string;

  /**
   * Título: UID
   * Descripción: Identificador único del usuario.
   * Opcional.
   */
  public uid?: string;

  /**
   * Título: Constructor de User
   * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
   * Descripción: Inicializa un nuevo usuario con los datos de autenticación proporcionados. Establece roles predeterminados.
   * @param authData Datos de autenticación del usuario.
   */
  constructor(authData) {
    this.email = authData.email;
    this.firstName = authData.firstName ? authData.firstName : '';
    this.lastName = authData.lastName ? authData.lastName : '';
    this.roles = {
      admin: false
    };
  }
}
