import { Vista } from './vista.js';
import { ModeloAutor } from '../models/modeloautor.js';

export class VistaLibro extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    
    this.datos = new ModeloAutor();
  }

  rellenarObra(datosLibro) {
    console.log(datosLibro)
    document.getElementById('imagen-libro').innerHTML = `<img src="${datosLibro.portada}" alt="Foto autor">`;

    document.getElementById('datos-libro').innerHTML = `
      <ul>
        <li>TITULO: ${datosLibro.titulo}</li>
        <li>AUTOR: ${datosLibro.id_autor}</li>
        <li>GENERO: ${datosLibro.genero}</li>
        <li>FECHA DE PUBLICACION: ${datosLibro.fecha_pubicacion}</li>
      </ul>
    `;

    document.getElementById('sinopsis').innerText = datosLibro.reseña;
    this.visualizarAutorLibro(datosLibro.id_autor)
  }

  async visualizarAutorLibro(id_autorLibro) {
    const autor = await this.datos.obtenerAutorPorLibro(id_autorLibro);
    console.log(autor)
    console.log(autor.nombre)
  }


}