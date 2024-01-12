import { Vista } from './vista.js';
import { Modelo } from '../models/modelo.js';

export class VistaListarAutor extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.datos = new Modelo();

        const crear = document.getElementById('btnCrear')
        crear.onclick = this.pulsarCrear.bind(this)
    }

    async visualizarAutor() {
        const autores = await this.datos.mostrarAutor();
    
        if (autores) {
            const divListarAutor = document.getElementById('divListarAutor');
            const scrollDiv = document.getElementById('scroll');
    
            // Limpiar la tabla existente
            scrollDiv.innerHTML = '';
    
            const tablaAutores = document.createElement('table');
            tablaAutores.classList.add('tabla');
    
            autores.forEach((autor) => {
                const filaAutor = document.createElement('tr');
    
                const imagenColumna = document.createElement('td');
                imagenColumna.classList.add('imagen-columna');
    
                const imagenLink = document.createElement('a');
                imagenLink.href = 'autor.html';
    
                const imagen = document.createElement('img');
                imagen.src = autor.foto; // Asumiendo que 'foto' es la URL de la imagen
                imagen.alt = 'Descripción de la imagen';
    
                const nombreAutorLink = document.createElement('a');
                nombreAutorLink.href = 'autor.html';
    
                const nombreAutorSpan = document.createElement('span');
                nombreAutorSpan.classList.add('nombre-autor');
                nombreAutorSpan.textContent = autor.nombre;
    
                nombreAutorLink.appendChild(imagen);
                nombreAutorLink.appendChild(nombreAutorSpan);
                imagenLink.appendChild(nombreAutorLink);
    
                imagenColumna.appendChild(imagenLink);
    
                const editorColumna = document.createElement('td');
                editorColumna.classList.add('editor-columna');
    
                const editarLink = document.createElement('a');
                editarLink.href = 'formulario-autores.html';
    
                const editarImagen = document.createElement('img');
                editarImagen.src = 'imagenes/lapiz.png';
                editarImagen.alt = 'Editar autor';
                editarImagen.classList.add('editor');
    
                const eliminarLink = document.createElement('a');
    
                const eliminarImagen = document.createElement('img');
                eliminarImagen.src = 'imagenes/papelera.png';
                eliminarImagen.alt = 'Eliminar autor';
                eliminarImagen.classList.add('editor');
    
                editarLink.appendChild(editarImagen);
                eliminarLink.appendChild(eliminarImagen);
    
                editorColumna.appendChild(editarLink);
                editorColumna.appendChild(eliminarLink);
    
                filaAutor.appendChild(imagenColumna);
                filaAutor.appendChild(editorColumna);
    
                tablaAutores.appendChild(filaAutor);
            });
    
            scrollDiv.appendChild(tablaAutores);
            divListarAutor.appendChild(scrollDiv);
        } else {
            console.log('No se pudo obtener la lista de Autores');
        }
    }
    
    
    async pulsarCrear() {
        this.controlador.verVista(Vista.vistainsertarautor)
    }
}
