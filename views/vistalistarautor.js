// Importar las clases necesarias
import { Vista } from './vista.js';
import { ModeloAutor } from '../models/modeloautor.js';

// Definir la clase VistaListarAutor
export class VistaListarAutor extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.datos = new ModeloAutor();
        this.listaMostrada = [];

        const crear = document.getElementById('añadir-autor');
        crear.onclick = this.pulsarCrear.bind(this);
    }

    async visualizarAutor() {
        const autores = await this.datos.mostrarAutor();
        this.listaMostrada = autores;

        if (autores) {
            const scrollDiv = document.getElementById('scroll');

            // Limpiar la tabla existente
            scrollDiv.innerHTML = '';

            const tablaAutores = document.createElement('table');
            tablaAutores.classList.add('tabla');

            autores.forEach((autor) => {
                const filaAutor = document.createElement('tr');

                const imagenColumna = document.createElement('td');
                imagenColumna.classList.add('imagen-columna');



                const imagen = document.createElement('img');
                imagen.src = autor.foto; // Así es como se asigna una imagen en formato Base64
                imagen.alt = 'Descripción de la imagen';


                const nombreAutorSpan = document.createElement('span');
                nombreAutorSpan.classList.add('nombre-autor');
                nombreAutorSpan.textContent = autor.nombre;

                nombreAutorLink.appendChild(imagen);
                nombreAutorLink.appendChild(nombreAutorSpan);
                imagenLink.appendChild(nombreAutorLink);

                imagenColumna.appendChild(imagenLink);

                const editorColumna = document.createElement('td');
                editorColumna.classList.add('editor-columna');


                const editarImagen = document.createElement('img');
                editarImagen.src = 'imagenes/lapiz.png';
                editarImagen.alt = 'Editar autor';
                editarImagen.classList.add('editor');



                const eliminarImagen = document.createElement('img');
                eliminarImagen.src = 'imagenes/papelera.png';
                eliminarImagen.alt = 'Eliminar autor';
                eliminarImagen.classList.add('editor');

                // Añadir un manejador de eventos al hacer clic en la papelera
                eliminarLink.onclick = () => this.pulsarBorrar(autor.id); 

                eliminarLink.appendChild(eliminarImagen);

                editorColumna.appendChild(editarLink);
                editorColumna.appendChild(eliminarLink);

                filaAutor.appendChild(imagenColumna);
                filaAutor.appendChild(editorColumna);

                tablaAutores.appendChild(filaAutor);
                filaAutor.onclick = () => this.infoAutor(autor.id);

            });

            scrollDiv.appendChild(tablaAutores);
        } else {
            console.log('No se pudo obtener la lista de Autores');
        }
    }

    async pulsarCrear() {
        this.controlador.verVista(Vista.vistainsertarautor);
    }

    async pulsarBorrar(idAutor) {
        // Llamar al método borrarAutor con el id del autor
        await this.datos.borrarAutor(idAutor);
        // Volver a visualizar la lista después de borrar
        this.controlador.pulsarAutor();
    }
    async infoAutor(id){
        this.controlador.verVista(Vista.vistaautor)
    }
}
