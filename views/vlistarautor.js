import { Vista } from './vista.js';
import { Modelo } from '../models/modelo.js';

export class ListarAutor extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.datos = new Modelo();
    }

    async visualizarLibro() {
        const obras = await this.datos.mostrarObra();

        if (obras) {
            const divListarLibro = document.getElementById('divListarLibro');
            divListarLibro.innerHTML = ''; // Limpiamos el contenido actual

            obras.forEach((obra) => {
                const obraElement = document.createElement('div');
                obraElement.textContent = `Título: ${obra.titulo}, Autor: ${obra.autor}, Año: ${obra.anio}`;
                divListarLibro.appendChild(obraElement);
            });
        } else {
            console.log('No se pudo obtener la lista de obras');
        }
    }
}
