import { Vista } from './vista.js';
import { Modelo } from '../models/modelo.js';

export class VistaListarLibro extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.datos = new Modelo();
    }

    async visualizarLibro() {
        const obras = await this.datos.mostrarObra();

        if (obras) {
            const divListarLibro = document.getElementById('divListarLibro');
            divListarLibro.innerHTML = '';
            

            obras.forEach((obra) => {
                // Crear un nuevo elemento h3 para cada obra
                const obraElement = document.createElement('h3');
                obraElement.textContent = `Título: ${obra.titulo}`;
                
                // Crear una nueva estructura de card para cada obra
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');
                cardContent.appendChild(obraElement);
                cardContent.innerHTML += `
                    <a href=""><img id="papelera" src="imagenes/papelera.png" alt="Borrar"></a>
                    <a href="formulario-libros.html"><img id="lapiz" src="imagenes/lapiz.png" alt="Editar"></a>
                `;
                cardElement.appendChild(cardContent);

                // Agregar la card al divListarLibro
                divListarLibro.appendChild(cardElement);
            });
        } else {
            console.log('No se pudo obtener la lista de obras');
        }
    }
}
