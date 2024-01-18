export class Vista {
    static {
      Vista.vmenuinicial = Symbol('Inicio') //Hacerlo con todas las vistas
      Vista.vistalistarautor = Symbol('Listar Autores')
      Vista.vistalistarlibro = Symbol('Listar Libros')
      Vista.vistainsertarlibro = Symbol('Crear Libros')
      Vista.vistainsertarautor = Symbol('Crear Autor')
      Vista.vistainformacion = Symbol('Informacion')
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