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

    const autorData = {
      nombre: document.getElementsByName('nombre')[0].value,
      fechaNacimiento: document.getElementsByName('fechaNacimiento')[0].value,
      fechaMuerte: document.getElementsByName('fechaMuerte')[0].value,
      biografia: document.getElementsByName('biografia')[0].value,
      foto: document.getElementsByName('foto')[0].value,
      nacionalidad: document.getElementsByName('nacionalidad')[0].value,
    };

    await this.modeloautor.insertarAutor(autorData);
  }
}
