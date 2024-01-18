import { Vista } from './vista.js';

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
        <li>AUTOR: ${datosLibro.id_autor}</li>
        <li>GENERO: ${datosLibro.genero}</li>
        <li>FECHA DE PUBLICACION: ${datosLibro.fecha_pubicacion}</li>
      </ul>
    `;

    document.getElementById('sinopsis').innerText = datosLibro.reseña;
  }

}