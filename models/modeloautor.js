import { Rest } from "../service/rest.js";

export class ModeloAutor {
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
          return null
      }
    }

    async insertarAutor(autorData) {
        const respuesta = await this.rest.crearAutor(autorData);

        if (respuesta) {
            console.log('Autor creado exitosamente:', respuesta);
            return await this.mostrarAutor();
        } else {
            console.error('Hubo un error al crear el autor.');
            return null;
        }
    }
  }