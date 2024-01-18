import { Vista } from './vista.js';
import { Rest } from '../service/rest.js';
import { ModeloAutor } from '../models/modeloautor.js';


export class VistaInsertarAutor extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    this.rest = new Rest();
    this.modeloautor = new ModeloAutor();

    const formulario = document.getElementById('formularioAutor');
    formulario.addEventListener('submit', (event) => this.pulsarCrearAutor(event));

  }

  async pulsarCrearAutor(event) {
    event.preventDefault();
  
    const inputFile = document.getElementsByName('foto')[0].files[0];
  
    // Verifica si se ha seleccionado un archivo
    if (inputFile) {
      // Convierte la imagen a Base64
      const base64Image = await this.getBase64FromImage(inputFile);
  
      const autorData = {
        nombre: document.getElementsByName('nombre')[0].value,
        fechaNacimiento: document.getElementsByName('fechaNacimiento')[0].value,
        fechaMuerte: document.getElementsByName('fechaMuerte')[0].value,
        biografia: document.getElementsByName('biografia')[0].value,
        foto: base64Image, // Guarda la imagen en Base64
        nacionalidad: document.getElementsByName('nacionalidad')[0].value,
      };
      
      await this.modeloautor.insertarAutor(autorData);
      this.controlador.pulsarAutor();
    } else {
      console.error('Por favor, selecciona una imagen');
    }
  }
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
