import { Rest } from "../service/rest.js";
export class Modelo {
    constructor () {
      this.rest = new Rest()
    }
    async mostrarAutor() {
      const autores = await this.rest.getAutor()

      if (autores) {
          console.log('Lista de autores:', autores)
          return autores
      } else {
          console.log('No se pudo obtener la lista de autores')
      }
  }
  async mostrarObra() {
      const obra = await this.rest.getObra()

      if (obra) {
          console.log('Lista de obras:', obra)
      } else {
          console.log('No se pudo obtener la lista de obras')
      }
  }
  }