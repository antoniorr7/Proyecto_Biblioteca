import { Rest } from "../service/rest.js";

export class ModeloAutor {
    constructor () {
      this.rest = new Rest()
    }
    async mostrarAutor() {
        try {
            const autores = await this.rest.getAutor();
            console.log('LISTA AUTORES:', autores);
            return autores;
        } catch (error) {
            console.error('Error al obtener la lista de autores:', error);
            return null;
        }
    }
    
    async insertarAutor(autorData) {
        const respuesta = await this.rest.crearAutor(autorData);
    
        if (respuesta) {
            console.log('Autor creado exitosamente:', respuesta);
            // Devuelve la lista de autores después de la inserción
            return await this.mostrarAutor();
        } else {
            console.error('Hubo un error al crear el autor.');
            return null;
        }
    }
    
    async borrarAutor(id){
        const respuesta = await this.rest.borrarAutor(id)
        
        if (respuesta) {
            console.log('Autor borrado exitosamente:', respuesta);
        } else {
            console.error('Hubo un error al borrar el autor.');
            return null;
        }
    }
    
  }