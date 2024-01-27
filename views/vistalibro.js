import { Vista } from './vista.js';
import { ModeloAutor } from '../models/modeloautor.js';
import { Rest } from '../service/rest.js';

export class VistaLibro extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    
    this.datos = new ModeloAutor();

  }

  rellenarObra(datosLibro) {
  
    document.getElementById('imagen-libro').innerHTML = `<img src="${datosLibro.portada}" alt="Foto autor">`;

    document.getElementById('datos-libro').innerHTML = `
      <ul>
        <li>TITULO: ${datosLibro.titulo}</li>
        <li>GENERO: ${datosLibro.genero}</li>
        <li>FECHA DE PUBLICACION: ${datosLibro.fecha_pubicacion}</li>
      </ul>
    `;

    document.getElementById('sinopsis').innerText = datosLibro.reseña;
    this.visualizarAutorLibro(datosLibro)
  }
  async visualizarAutorLibro(datos) {
    const datosAutor = new Rest();
  
    try {
      // Obtener la lista completa de autores
      const autores = await datosAutor.getAutorPorId(datos.id);
  
      // Buscar el autor por ID
      const autorEncontrado = autores.find(autor => autor.id === datos.id_autor);
  
      if (autorEncontrado) {
  
        // Insertar imagen y nombre en el HTML
        document.querySelector('.card-detalles-libro').innerHTML = `
          <img src="${autorEncontrado.foto}" alt="Imagen del autor">
          <p> ${autorEncontrado.nombre}</p>
        `;
      } else {
        console.log('No se encontró el autor con el ID proporcionado.');
      }
    } catch (error) {
      console.error('Error al obtener la lista de autores:', error);
    }
  }
  
}