import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';

export class VistaInsertarLibro extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.rest = new Rest();

    // Asignar el evento al formulario del libro
    const formularioLibro = document.getElementById('formularioLibro');
    formularioLibro.onsubmit = this.pulsarCrearLibro.bind(this);

    // Llenar el desplegable de autores al cargar la página
    this.llenarDesplegableAutores();
  }

  async llenarDesplegableAutores() {
    const desplegableAutores = document.getElementsByName('autor')[0];
    const autores = await this.rest.getAutor();

    autores.forEach((autor) => {
      const option = document.createElement('option');
      option.value = autor.id;
      option.text = autor.nombre;
      desplegableAutores.add(option);
    });
  }

  async pulsarCrearLibro(event) {
    event.preventDefault();

    const libroData = {
      titulo: document.getElementsByName('titulo')[0].value,
      id_autor: parseInt(document.getElementsByName('autor')[0].value),
      fecha_publicacion: document.getElementsByName('fecha_publicacion')[0].value,
      reseña: document.getElementsByName('reseña')[0].value,
      portada: document.getElementsByName('portada')[0].value,
      genero: document.getElementsByName('genero')[0].value,
    };

    const respuesta = await this.rest.crearObra(libroData);

    if (respuesta) {
      console.log('Libro creado exitosamente:', respuesta);
    } else {
      console.error('Hubo un error al crear el libro.');
    }
  }
}
