import { Rest } from "../service/rest.js";

export class ModeloObra {
    constructor () {
      this.rest = new Rest()
    }
    async mostrarObra() {
      const obra = await this.rest.getObra()

      if (obra) {
          console.log('Lista de obras:', obra)
          return obra
      } else {
          console.log('No se pudo obtener la lista de obras')
          return null
      }
    }

    
    async insertarObra(obraData) {
        const respuesta = await this.rest.crearObra(obraData);

        if (respuesta) {
            console.log('Obra creado exitosamente:', respuesta);
            return await this.mostrarAutor();
        } else {
            console.error('Hubo un error al crear el autor.');
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