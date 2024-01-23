// Importar las clases necesarias
import { Vista } from './vista.js';
import { ModeloAutor } from '../models/modeloautor.js';
import { VistaAutor } from '../views/vistaautor.js';
import { VistaListarLibro } from '../views/vistalistarlibro.js';
import { VistaEditarAutor } from './vistaeditarautor.js';

// Definir la clase VistaListarAutor
export class VistaListarAutor extends Vista {
    constructor(controlador, base, libroseleccionado) {
        super(controlador, base);
        this.datos = new ModeloAutor();
        this.datosautor = new VistaAutor();
        this.libroseleccionado = libroseleccionado;

        this.listaMostrada = [];

        
        const crear = document.getElementById('añadir-autor');
        crear.onclick = this.pulsarCrear.bind(this);
        this.autor
        this.autorseleccionado
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
    
                const imagenLink = document.createElement('a');
    
                const imagen = document.createElement('img');
                imagen.src = autor.foto; // Así es como se asigna una imagen en formato Base64
                imagen.alt = 'Descripción de la imagen';
    
                const nombreAutorLink = document.createElement('a');
    
                const nombreAutorSpan = document.createElement('span');
                nombreAutorSpan.classList.add('nombre-autor');
                nombreAutorSpan.textContent = autor.nombre;
    
                nombreAutorLink.appendChild(imagen);
                nombreAutorLink.appendChild(nombreAutorSpan);
                imagenLink.appendChild(nombreAutorLink);
    
                imagenColumna.appendChild(imagenLink);
    
                const editorColumna = document.createElement('td');
                editorColumna.classList.add('editor-columna');
    
                const eliminarLink = document.createElement('a');
    
                const eliminarImagen = document.createElement('img');
                eliminarImagen.src = 'imagenes/delete.png';
                eliminarImagen.alt = 'Eliminar autor';
                eliminarImagen.classList.add('editor');
    
                // Añadir un manejador de eventos al hacer clic en la papelera
                eliminarLink.onclick = () => this.pulsarBorrar(autor.id);
    
                eliminarLink.appendChild(eliminarImagen);
    
              
    
                const editarImagen = document.createElement('img');
                editarImagen.src = 'imagenes/edit.png'; // Asegúrate de tener la imagen correcta y la ruta correcta
                editarImagen.alt = 'Editar autor';
                editarImagen.classList.add('editor');
    
                // Añadir un manejador de eventos al hacer clic en el lápiz
                editarImagen.onclick = () => this.pulsarEditar(autor);
    
               
    
                editorColumna.appendChild(eliminarLink);
                editorColumna.appendChild(editarImagen); // Agrega el enlace de editar junto al de eliminar
    
                filaAutor.appendChild(imagenColumna);
                filaAutor.appendChild(editorColumna);
    
                tablaAutores.appendChild(filaAutor);
    
                nombreAutorLink.addEventListener('click', () => {
                    this.autor = autor;
                    this.pulsarAutor();
                });
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

    async pulsarAutor(){ 
        this.autorseleccionado = this.autor.id;
        const vistaListarLibro = new VistaListarLibro(this.controlador, this.base, this.autorSeleccionadoId);
        vistaListarLibro.visualizarLibro();
        this.datosautor.rellenarAutor(this.autor)
        this.controlador.verVista(Vista.vistaautor)
    }

    async pulsarEditar(autor){
        this.controlador.verVista(Vista.vistaeditarautor)
        const vistaEditarAutor = new VistaEditarAutor(autor)
        vistaEditarAutor.rellenar(autor)
       
    }
}
