import { Vista } from './vista.js';
import { ModeloAutor } from '../models/modeloautor.js';
import { VistaAutor } from '../views/vistaautor.js';
import { VistaListarLibro } from '../views/vistalistarlibro.js';
import { VistaEditarAutor } from './vistaeditarautor.js';

export class VistaListarAutor extends Vista {
    constructor(controlador, base, libroseleccionado) {
        super(controlador, base);
        this.datos = new ModeloAutor();
        this.datosautor = new VistaAutor();
        this.libroseleccionado = libroseleccionado;
        this.listaMostrada = [];

        const crear = document.getElementById('añadir-autor');
        crear.addEventListener('click', this.pulsarCrear.bind(this));


        this.seleccionados = new Set();
        this.checkboxSeleccionarAutor = document.getElementById('seleccionar-autores');
        this.checkboxSeleccionarAutor.addEventListener('change', this.toggleSeleccionarTodosAutor.bind(this));

        const borrarSeleccionados = document.getElementById('borrar-autores');
        borrarSeleccionados.addEventListener('click', this.borrarAutoresSeleccionados.bind(this));
        
        
        this.autor = null;
        this.autorseleccionado = null;
    }
    
    toggleSeleccionarTodosAutor() {
        const checkboxEstado = this.checkboxSeleccionarAutor.checked;
        this.seleccionados.clear(); // Limpiar selección actual
    
        if (checkboxEstado) {
            this.seleccionados = new Set(this.listaMostrada.map(autor => autor.id));
        }
    
        this.actualizarEstadoBotonBorrar();
    }
    

    toggleSeleccionarAutor(idAutor) {
        this.seleccionados.has(idAutor) ? this.seleccionados.delete(idAutor) : this.seleccionados.add(idAutor);
    
        // Actualizar el estado del checkbox "Seleccionar todos"
        this.checkboxSeleccionarAutor.checked = this.seleccionados.size === this.listaMostrada.length;
    
        this.actualizarEstadoBotonBorrar();
    }
    

    actualizarEstadoBotonBorrar() {
        const borrarSeleccionados = document.getElementById('borrar-seleccionados');
        borrarSeleccionados.disabled = this.seleccionados.size === 0;
    }

    async borrarAutoresSeleccionados() {
        if (this.seleccionados.size === 0) {
            alert('Selecciona al menos un autor para borrar.');
            return;
        }
    
        if (confirm('¿Estás seguro de que deseas borrar los autores seleccionadas?')) {
            const idsSeleccionados = Array.from(this.seleccionados);
            await this.datos.borrarAutor(idsSeleccionados);
            this.controlador.pulsarAutor();
        }
    }
    
    

    cambiarEstadoAutor(idAutor, favAutor) {
        const autorFavorito = this.comprobarCookie('Id_Autor_Fav_' + idAutor) === 'true';

        if (autorFavorito) {
            this.quitarFavorito(idAutor, favAutor);
        } else {
            this.agregarFavorito(idAutor, favAutor);
        }
    }

    agregarFavorito(idAutor, favAutor) {
        favAutor.src = 'imagenes/favorite.png';
        this.colocarCookie('Id_Autor_Fav_' + idAutor, 'true', 30);
    }

    colocarCookie(nombre, valor) {
        document.cookie = nombre + "=" + valor + ";path=/";
    }

    // Función para quitar un libro de favoritos
    quitarFavorito(idAutor, favAutor) {
        favAutor.src = 'imagenes/favorite01.png';
        this.colocarCookie('Id_Autor_Fav_' + idAutor, 'false', 30);
        //No entiendo para que es el valor de las cookies
    }

    comprobarCookie(nombre) {
        const nombreCookie = nombre + "=";
        console.log(nombreCookie)
        const cookies = document.cookie.split(";");
        console.log(cookies)
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i]; //Saca cada elemento del array
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1); //Esto nos elimina los espacios en blanco que hay al principio
            }
            if (cookie.indexOf(nombreCookie) == 0) {
                return cookie.substring(nombreCookie.length, cookie.length);
            }
        }
        return "";
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
    
                const imagenLink = document.createElement('div');
                imagenLink.classList.add('divAutores');
    
                const imagen = document.createElement('img');
                imagen.src = autor.foto; // Así es como se asigna una imagen en formato Base64
                imagen.alt = 'Descripción de la imagen';
    
                // Añadir checkbox para seleccionar el autor
                const checkboxSeleccion = document.createElement('input');
                checkboxSeleccion.type = 'checkbox';
                checkboxSeleccion.addEventListener('change', () => this.toggleSeleccionarAutor(autor.id));
                imagenColumna.appendChild(checkboxSeleccion);
    
                const nombreAutorSpan = document.createElement('span');
                nombreAutorSpan.classList.add('nombre-autor');
                nombreAutorSpan.textContent = autor.nombre;
    
                imagenLink.appendChild(imagen);
                imagenLink.appendChild(nombreAutorSpan);
    
                imagenColumna.appendChild(imagenLink);
    
                const editorColumna = document.createElement('td');
                editorColumna.classList.add('editor-columna');
    
                const editores = document.createElement('div');
                editores.classList.add('editores');
    
                const eliminarImagen = document.createElement('img');
                eliminarImagen.src = 'imagenes/delete.png';
                eliminarImagen.alt = 'Eliminar autor';
                eliminarImagen.classList.add('editor');
    
                // Añadir un manejador de eventos al hacer clic en la papelera
                eliminarImagen.onclick = () => this.pulsarBorrar(autor.id);
    

                imagenColumna.appendChild(editores);
                editores.appendChild(eliminarImagen);
    
              
                const favAutor = document.createElement('img');
                favAutor.src = this.comprobarCookie('Id_Autor_Fav_' + autor.id) === 'true' ? 'imagenes/favorite.png' : 'imagenes/favorite01.png';
                
                favAutor.classList.add('editor');
                
                favAutor.onclick = () => {
                    this.cambiarEstadoAutor(autor.id, favAutor);
                };
    
                const editarImagen = document.createElement('img');
                editarImagen.src = 'imagenes/edit.png'; // Asegúrate de tener la imagen correcta y la ruta correcta
                editarImagen.alt = 'Editar autor';
                editarImagen.classList.add('editor');
    
                // Añadir un manejador de eventos al hacer clic en el lápiz
                editarImagen.onclick = () => this.pulsarEditar(autor);
    
                editores.appendChild(editarImagen);
                editores.appendChild(favAutor);
    
                 // Agrega el enlace de editar junto al de eliminar
    
                filaAutor.appendChild(imagenColumna);
    
                tablaAutores.appendChild(filaAutor);
    
                imagenLink.addEventListener('click', () => {
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

    async pulsarAutor() {
        this.autorseleccionado = this.autor ? this.autor.id : null; // Corregir error en la propiedad
        const vistaListarLibro = new VistaListarLibro(this.controlador, this.base, this.autorseleccionado);
        vistaListarLibro.visualizarLibro();
        this.datosautor.rellenarAutor(this.autor);
        this.controlador.verVista(Vista.vistaautor);
    }

    async pulsarEditar(autor) {
        this.controlador.verVista(Vista.vistaeditarautor);
        const vistaEditarAutor = new VistaEditarAutor(autor);
        vistaEditarAutor.rellenar(autor, this.controlador);
    }
}
