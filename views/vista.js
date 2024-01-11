export class Vista {
    static {
      Vista.vmenuinicial = Symbol('Inicio') //Hacerlo con todas las vistas
      Vista.vlistarautor = Symbol('Listar Autores')
      Vista.vmodificarautor = Symbol('Modificar Libros')
      Vista.vlistarlibro = Symbol('Listar Libros')
      Vista.vmodificarlibro = Symbol('Modificar Libros')
      Vista.vcrearlibro = Symbol('Crear Libros')
      Vista.vcrearautor = Symbol('Crear Autor')
    }
  
    constructor(controlador, base) {
      this.controlador = controlador
      this.base = base
    }
  
    mostrar(ver) {
      if (ver)
        this.base.style.display = 'block'
      else 
        this.base.style.display = 'none'
    }
  }