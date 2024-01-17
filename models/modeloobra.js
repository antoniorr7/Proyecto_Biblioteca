import { Rest } from "../service/rest.js";

export class ModeloObra {
    constructor () {
      this.rest = new Rest()
    }
    async mostrarObra() {
        try {
            const obra = await this.rest.getObra()
            console.log('Lista de obras:', obra)
            return obra;
        } catch (error) {
            console.error('Error al obtener la lista de Obras:', error);
            return null;
        }
    }

    async insertarObra(obraData) {
        const respuesta = await this.rest.crearObra(obraData);

        if (respuesta) {
            console.log('Obra creado exitosamente:', respuesta);
            return await this.mostrarObra();
        } else {
            console.error('Hubo un error al crear la obra.');
            return null;
        }
    }

    async borrarObra(id){
      const respuesta = await this.rest.borrarObra(id)
      
      if (respuesta) {
          console.log('Obra borrado exitosamente:', respuesta);
      } else {
          console.error('Hubo un error al borrar la obra.');
          return null;
      }
    }
  }