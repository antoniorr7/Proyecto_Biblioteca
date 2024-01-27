import { Rest } from "../service/rest.js";

export class ModeloObra {
    constructor () {
      this.rest = new Rest()
    }
    async mostrarObra() {
        try {
            const obra = await this.rest.getObra()

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

    async borrarObra(ids){
      const respuesta = await this.rest.borrarObra(ids)
      
      if (respuesta) {
          console.log('Obra borrado exitosamente:', respuesta);
      } else {
          console.error('Hubo un error al borrar la obra.');
          return null;
      }
    }

    async obtenerLibrosPorAutor(idAutor) {
        try {
            // Obtener todas las obras
            const obras = await this.mostrarObra();

            // Filtrar las obras que pertenecen al autor con el idAutor proporcionado
            const librosAutor = obras.filter(obra => obra.id_autor === idAutor);


            return librosAutor;
        } catch (error) {
            console.error('Error al obtener los libros del autor:', error);
            return null;
        }
    }
    async editarObra(obraData) {
        try {

            const respuesta = await this.rest.actualizarObra(obraData);
     

        } catch (error) {
            console.log(error);
        }
    }
  }