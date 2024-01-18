import { Vista } from './vista.js';

export class VistaAutor extends Vista {
  constructor(controlador, base) {
    super(controlador, base);
    
  }

  rellenarAutor(datosAutor) {
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
  }
}