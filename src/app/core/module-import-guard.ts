/**
 * Título: Función throwIfAlreadyLoaded
 * Autor: ANDRES FERNANDO VALBUENA GONZÁLEZ
 * Descripción: Esta función verifica si un módulo ya ha sido cargado para evitar cargas múltiples del módulo Core. Si el módulo ya ha sido cargado, lanza un error.
 * @param parentModule Instancia del módulo padre.
 * @param moduleName Nombre del módulo que se está verificando.
 * @throws Error si el módulo ya ha sido cargado.
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
