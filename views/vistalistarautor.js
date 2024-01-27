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
        this.inicializarCookies();

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
    
    async visualizarAutor() {
        const autores = await this.datos.mostrarAutor();
        this.listaMostrada = autores;
    
        if (autores) {
            const scrollDiv = document.getElementById('scroll');
    
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
                
                const nombreAutorSpan = document.createElement('span');
                nombreAutorSpan.classList.add('nombre-autor');
                nombreAutorSpan.textContent = autor.nombre;
    
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
    
                const favAutor = document.createElement('img');
                favAutor.src = this.comprobarSiAutorEsFavorito(autor.id) ? 'imagenes/favorite.png' : 'imagenes/favorite01.png';
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
    
                imagenColumna.appendChild(checkboxSeleccion);
                imagenLink.appendChild(imagen);
                imagenLink.appendChild(nombreAutorSpan);
                imagenColumna.appendChild(imagenLink);
                editores.appendChild(editarImagen);
                editores.appendChild(favAutor);
                filaAutor.appendChild(imagenColumna);
                tablaAutores.appendChild(filaAutor);
                imagenColumna.appendChild(editores);
                editores.appendChild(eliminarImagen);
    
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
      
        this.datosautor.rellenarAutor(this.autor);
        this.controlador.verVista(Vista.vistaautor);
    }

    async pulsarEditar(autor) {
        this.controlador.verVista(Vista.vistaeditarautor);
        const vistaEditarAutor = new VistaEditarAutor(autor);
        vistaEditarAutor.rellenar(autor, this.controlador);
    }

    /*-----------------------GESTION DE COOKIES--------------------- */
    inicializarCookies() {
        if (!this.obtenerCookieArray('Autores_Favoritos')) {
            this.colocarCookieArray('Autores_Favoritos', []);
        }
    }

    cambiarEstadoAutor(idAutor, favAutor) {
        const autorFavorito = this.comprobarCookie('Id_Autor_Fav_' + idAutor) === 'true';

        if (autorFavorito) {
            this.quitarFavorito(idAutor, favAutor);
        } else {
            this.agregarFavorito(idAutor, favAutor);
        }

        favAutor.src = this.comprobarSiAutorEsFavorito(idAutor) ? 'imagenes/favorite.png' : 'imagenes/favorite01.png';
    }

    quitarFavorito(idAutor, favAutor) {
        const autoresFavoritos = this.obtenerCookieArray('Autores_Favoritos');
        const indice = autoresFavoritos.indexOf(idAutor);
        if (indice !== -1) {
            autoresFavoritos.splice(indice, 1);
            this.colocarCookieArray('Autores_Favoritos', autoresFavoritos);
        }
        favAutor.src = 'imagenes/favorite01.png';
    }

    obtenerCookieArray(nombre) {
        const nombreCookie = nombre + "=";
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nombreCookie) == 0) {
                const valor = cookie.substring(nombreCookie.length);
                return JSON.parse(valor);
            }
        }
        return [];
    }

    comprobarCookie(nombre) {
        const nombreCookie = nombre + "=";

        const cookies = document.cookie.split(";");

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

    agregarFavorito(idAutor) {
        const autoresFavoritos = this.obtenerCookieArray('Autores_Favoritos');
        
        const index = autoresFavoritos.indexOf(idAutor);
        if (index === -1) {
            autoresFavoritos.push(idAutor);
            this.colocarCookieArray('Autores_Favoritos', autoresFavoritos);
        } else {
            autoresFavoritos.splice(index, 1); // Eliminar el libro si ya está en favoritos
            this.colocarCookieArray('Autores_Favoritos', autoresFavoritos);
        }
    }

    colocarCookieArray(nombre, array) {
        const valor = JSON.stringify(array);
        document.cookie = nombre + "=" + valor + ";path=/";
    }

    comprobarSiAutorEsFavorito(idAutor) {
        const librosFavoritos = this.obtenerCookieArray('Autores_Favoritos');
        return librosFavoritos.includes(idAutor);
    }

    
    /* -------------------------------- BORRADO MULTIPLES   --------------------------------*/

    toggleSeleccionarTodosAutor() {
        const checkboxEstado = this.checkboxSeleccionarAutor.checked;
        this.seleccionados.clear();
    
        if (checkboxEstado) {
            this.seleccionados = new Set(this.listaMostrada.map(autor => autor.id));
        }
    
        this.actualizarEstadoBotonBorrar();
    }
    
    toggleSeleccionarAutor(idAutor) {
        if(this.seleccionados.has(idAutor)){
            this.seleccionados.delete(idAutor)
        }else{
            this.seleccionados.add(idAutor);
        }
        this.checkboxSeleccionarAutor.checked = this.seleccionados.size === this.listaMostrada.length;
    
        this.actualizarEstadoBotonBorrar();
    }
    
    actualizarEstadoBotonBorrar() {
        const borrarSeleccionados = document.getElementById('borrar-seleccionados');
        borrarSeleccionados.disabled = this.seleccionados.size === 0;
    }

    async borrarAutoresSeleccionados() {
        if (this.seleccionados.size === 0) {
            this.mostrarMensaje('Selecciona al menos un autor para borrar.');
            return;
        }
    
        const respuesta = await this.mostrarConfirmacion('¿Estás seguro de que deseas borrar los autores seleccionados?');
    
        if (respuesta) {
            const idsSeleccionados = Array.from(this.seleccionados);
            await this.datos.borrarAutor(idsSeleccionados);
            this.controlador.pulsarAutor();
        }
    }
    
    mostrarMensaje(mensaje) {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        // Establece estilos según tus necesidades
    
        document.body.appendChild(mensajeDiv);
    
        setTimeout(() => {
            document.body.removeChild(mensajeDiv);
        }, 3000);
    }
    
    async mostrarConfirmacion(mensaje) {
        return new Promise(resolve => {
            const confirmacionDiv = document.createElement('div');
            confirmacionDiv.style.position = 'fixed';
            confirmacionDiv.style.top = '50%';
            confirmacionDiv.style.left = '50%';
            confirmacionDiv.style.transform = 'translate(-50%, -50%)';
            confirmacionDiv.style.backgroundColor = '#fff';
            confirmacionDiv.style.border = '1px solid #ccc';
            confirmacionDiv.style.padding = '10px';
            confirmacionDiv.style.zIndex = '1000';
    
            const mensajeP = document.createElement('p');
            mensajeP.textContent = mensaje;
            confirmacionDiv.appendChild(mensajeP);
    
            const botonAceptar = document.createElement('button');
            botonAceptar.textContent = 'Aceptar';
            botonAceptar.addEventListener('click', () => {
                document.body.removeChild(confirmacionDiv);
                resolve(true);
            });
            confirmacionDiv.appendChild(botonAceptar);
    
            const botonRechazar = document.createElement('button');
            botonRechazar.textContent = 'Rechazar';
            botonRechazar.addEventListener('click', () => {
                document.body.removeChild(confirmacionDiv);
                resolve(false);
            });
            confirmacionDiv.appendChild(botonRechazar);
    
            document.body.appendChild(confirmacionDiv);
        });
    }
    
}
