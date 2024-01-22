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

    async obtenerLibrosPorAutor(idAutor) {
        try {
            // Obtener todas las obras
            const obras = await this.mostrarObra();

            // Filtrar las obras que pertenecen al autor con el idAutor proporcionado
            const librosAutor = obras.filter(obra => obra.id_autor === idAutor);

            console.log(`Lista de libros del autor con ID ${idAutor}:`, librosAutor);
            return librosAutor;
        } catch (error) {
            console.error('Error al obtener los libros del autor:', error);
            return null;
        }
    }
    async editarObra(obraData) {
        try {
            console.log('modelo', obraData);
            const respuesta = await this.rest.actualizarObra(obraData);
     
            console.log('Obra modificada exitosamente:', respuesta);
        } catch (error) {
            console.log(error);
        }
    }
  }