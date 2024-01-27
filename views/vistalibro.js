import { Vista } from './vista.js';
import { ModeloAutor } from '../models/modeloautor.js';
import { Rest } from '../service/rest.js';

export class VistaLibro extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    

  }

  rellenarObra(datosLibro) {
  console.log(datosLibro)
    document.getElementById('imagen-libro').innerHTML = `<img src="${datosLibro.portada}" alt="Foto autor">`;

    document.getElementById('datos-libro').innerHTML = `
      <ul>
        <li>TITULO: ${datosLibro.titulo}</li>
        <li>GENERO: ${datosLibro.genero}</li>
        <li>FECHA DE PUBLICACION: ${datosLibro.fecha_publicacion}</li>
      </ul>
    `;

    document.getElementById('sinopsis').innerText = datosLibro.reseña;
    this.visualizarAutorLibro(datosLibro.id_autor)
  }
  async visualizarAutorLibro(idAutor) {
    const datosAutor = new Rest();
    const listaAutores = await datosAutor.getAutor()

    try {
      const autorLibro = listaAutores.find(autor => autor.id === idAutor);

      if (autorLibro) {

          const cardDetallesLibro = document.querySelector('.card-detalles-libro');
          
          // Limpiar el contenido actual
          cardDetallesLibro.innerHTML = '';

          // Agregar la nueva información
          cardDetallesLibro.innerHTML = `
            <img src="${autorLibro.foto}" alt="Imagen del autor">
            <p>${autorLibro.nombre}</p>
          `;
      }
    
    } catch (error) {
      console.error('Error al obtener la lista de autores:', error);
    }
}

}