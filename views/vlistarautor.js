import { Vista } from './vista.js';
import { Modelo } from '../models/modelo.js';

export class ListarAutor extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.datos = new Modelo();
    }

    async visualizarAutor() {
        const autores = await this.datos.mostrarAutor();

        if (autores) {
            const divListarAutor = document.getElementById('divListarAutor');
            divListarAutor.innerHTML = ''; // Limpiamos el contenido actual

            autores.forEach((autor) => {
                const autoresDiv = document.createElement('div');
                autoresDiv.textContent = `Nombre: ${autor.nombre}, Fecha Nacimiento: ${autor.fecha_nacimiento}, Fecha Muerte: ${autor.fecha_muerte}, Nacionalidad: ${autor.nacionalidad}, Foto: ${autor.foto}`;
                divListarAutor.appendChild(autoresDiv);
            });
        } else {
            console.log('No se pudo obtener la lista de Autores');
        }
    }
}
