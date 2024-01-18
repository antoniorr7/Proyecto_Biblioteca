import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';
import { ModeloObra } from '../models/modeloobra.js';

export class VistaInsertarLibro extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.rest = new Rest();
    this.modeloobra = new ModeloObra();

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

    const inputFile = document.getElementsByName('portada')[0].files[0];
    
    // Verifica si se ha seleccionado un archivo
    if (inputFile) {
      // Convierte la imagen a Base64
      const base64Image = await this.getBase64FromImage(inputFile);
    
      const libroData = {
        titulo: document.getElementsByName('tituloLibro')[0].value,
        id_autor: parseInt(document.getElementsByName('autor')[0].value),
        fecha_publicacion: document.getElementsByName('fecha_publicacion')[0].value,
        reseña: document.getElementsByName('reseña')[0].value,
        portada: base64Image, // Guarda la imagen en Base64
        genero: document.getElementsByName('genero')[0].value,
      };
      await this.modeloobra.insertarObra(libroData);
      this.controlador.pulsarLibro();
    } else {
      console.error('Por favor, selecciona una imagen');
    }
    
  }
  // Función para convertir una imagen a Base64
 getBase64FromImage(inputFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(inputFile);
  });
}
}