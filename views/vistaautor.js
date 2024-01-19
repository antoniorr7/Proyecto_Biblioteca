import { Vista } from './vista.js';
import { ModeloObra } from '../models/modeloobra.js';

export class VistaAutor extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.datos = new ModeloObra();
  }

  rellenarAutor(datosAutor) {
    console.log('ID DEL AUTOR: ', datosAutor.id);
    document.getElementById('imagen').innerHTML = `<img src="${datosAutor.foto}" alt="Foto autor">`;

    document.getElementById('datos').innerHTML = `
      <ul>
        <li>NOMBRE: ${datosAutor.nombre}</li>
        <li>FECHA NACIMIENTO: ${datosAutor.fechaNacimiento}</li>
        <li>FECHA MUERTE: ${datosAutor.fechaMuerte}</li>
        <li>NACIONALIDAD: ${datosAutor.nacionalidad}</li>
      </ul>
    `;

    document.getElementById('biografía').innerText = datosAutor.biografia;
    this.visualizarLibrosAutor(datosAutor.id);
  }

  async visualizarLibrosAutor(idAutor) {
    // Utiliza el nuevo método en ModeloObra para obtener los libros del autor
    const libros = await this.datos.obtenerLibrosPorAutor(idAutor);

    const contenedorLibros = document.getElementById('scroll-lateral-detalles');

    // Limpia el contenido previo del contenedor de libros
    contenedorLibros.innerHTML = '';

    // Itera sobre cada libro y crea dinámicamente una carta con el título y la portada
    libros.forEach(libro => {
        const cartaLibro = document.createElement('div');
        cartaLibro.className = 'card-detalles';

        const imagenDiv = document.createElement('div');
        imagenDiv.id = 'imagen';
        imagenDiv.innerHTML = `<img src="${libro.portada}" alt="Portada del libro">`;

        const contenidoDiv = document.createElement('div');
        contenidoDiv.className = 'card-content-detalles';
        contenidoDiv.innerHTML = `<h3 id="tituloLibro">${libro.titulo}</h3>`;

        cartaLibro.appendChild(imagenDiv);
        cartaLibro.appendChild(contenidoDiv);

        contenedorLibros.appendChild(cartaLibro);
    });
}

}
