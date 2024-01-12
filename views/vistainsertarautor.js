import { Vista } from './vista.js'
import { Rest } from "../service/rest.js"

export class VistaInsertarAutor extends Vista {
  constructor(controlador, base) {
      super(controlador, base)
      this.rest = new Rest()

      const formulario = document.getElementById('formularioAutor')
      formulario.onsubmit = this.pulsarCrearAutor.bind(this)
  }

  async pulsarCrearAutor(event) {
      event.preventDefault()

      const autorData = {
          nombre: document.getElementsByName('nombre')[0].value,
          fechaNacimiento: document.getElementsByName('fechaNacimiento')[0].value,
          fechaMuerte: document.getElementsByName('fechaMuerte')[0].value,
          biografia: document.getElementsByName('biografia')[0].value,
          foto: document.getElementsByName('foto')[0].value,
          nacionalidad: document.getElementsByName('nacionalidad')[0].value
      };

      const respuesta = await this.rest.crearAutor(autorData)

      if (respuesta) {
          console.log('Autor creado exitosamente:', respuesta)
      } else {
          console.error('Hubo un error al crear el autor.')
      }
  }
}
