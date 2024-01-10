export class Vista {
    static {
      Vista.vmenuinicial = Symbol('Inicio') //Hacerlo con todas las vistas
      Vista.vlistarautores = Symbol('Listar Autores')
      Vista.vmodificarautores = Symbol('Modificar Libros')
      Vista.vlistarlibros = Symbol('Listar Libros')
      Vista.vmodificarlibros = Symbol('Modificar Libros')
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