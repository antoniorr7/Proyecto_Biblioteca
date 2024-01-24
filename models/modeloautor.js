import { Rest } from "../service/rest.js";

export class ModeloAutor {
    constructor () {
      this.rest = new Rest()
    }
    async mostrarAutor() {
        try {
            const autores = await this.rest.getAutor();

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

    async obtenerAutorPorLibro(idAutorLibro) {
        try {
            // Obtener todas las autores
            const autores = await this.mostrarAutor();

            // Filtrar las autores que pertenecen al autor con el idAutor proporcionado
            const librosAutor = autores.filter(autor => autor.id === idAutorLibro);

            console.log(`Lista de autores del libro con ID ${idAutorLibro}:`, librosAutor);
            return librosAutor;
        } catch (error) {
            console.error('Error al obtener los libros del autor:', error);
            return null;
        }
    }
    async editarAutor(autorData) {
        try
        {
            console.log('modelo',autorData);
            const respuesta = await this.rest.actualizarAutor(autorData);
     
            console.log('Autor modificado exitosamente:', respuesta);
        }catch(error){
            console.log(error);
        }
      
       
    }
    async cogerBusqueda(text){
        console.log(text);
        const respuesta = await this.rest.buscarAutores(text);
        return respuesta;
       
    }

    }
  