import { Vista } from './vista.js';
import { ModeloObra } from '../models/modeloobra.js';
import { VistaLibro } from '../views/vistalibro.js';
import { VistaListarAutor } from '../views/vistalistarautor.js';
import { VistaEditarLibro } from '../views/vistaeditarlibro.js';
import { VistaInsertarLibro } from '../views/vistainsertarlibro.js';

export class VistaListarLibro extends Vista {
    constructor(controlador, base, autorseleccionado) {
        super(controlador, base);
        this.datos = new ModeloObra();
        this.datosobra = new VistaLibro();

        this.autorseleccionado = autorseleccionado;
        this.listaMostrada = [];
        this.inicializarCookies();

        const crear = document.getElementById('crearLibro')
        crear.onclick = this.pulsarCrear.bind(this);

        this.seleccionados = new Set()
        this.checkboxSeleccionarTodasObras = document.getElementById('seleccionar-todos');
        this.checkboxSeleccionarTodasObras.addEventListener('change', this.seleccionarTodasObras.bind(this));

        const borrarSeleccionados = document.getElementById('borrar-seleccionados');
        borrarSeleccionados.addEventListener('click', this.borrarObrasSeleccionadas.bind(this));
        
        this.obra = null; // Inicializar correctamente
        this.libroseleccionado = null; // Inicializar correctamente
    }

    async visualizarLibro() {
        try {

            const obras = await this.datos.mostrarObra();
    
            if (obras) {
                const divScrollLateral = document.getElementById('scroll-lateral');
                divScrollLateral.innerHTML = '';
    
                obras.forEach((obra) => {
                    // Crear una nueva estructura de card para cada obra
                    const cardElement = document.createElement('div');
                    cardElement.classList.add('card');

                    
    
                    // Crear el elemento de la imagen usando el campo 'portada' de la obra
                    const portadaImage = document.createElement('img');
                    portadaImage.src = obra.portada; // Utiliza la ruta de la imagen directamente
                    portadaImage.alt = 'Descripción de la imagen';
                    portadaImage.addEventListener('click', () => {
                        this.obra = obra;
                        this.pulsarObra();
                    });

                    // Agregar la imagen al enlace
                    cardElement.appendChild(portadaImage);
    
                    // Crear un div para el contenido de la card
                    const cardContent = document.createElement('div');
                    cardContent.classList.add('card-content');

                    const opciones = document.createElement('div');
                    opciones.classList.add('opciones');
    
                    // Crear un h3 para el título de la obra
                    const obraElement = document.createElement('h3');
                    obraElement.textContent = `Título: ${obra.titulo}`;
    
                    // Crear enlaces para la papelera y el lápiz
                    const eliminarObra = document.createElement('img');
                    eliminarObra.src = 'imagenes/delete.png';
                    eliminarObra.alt = 'Eliminar Obra';
                    eliminarObra.id = 'papelera';
                    eliminarObra.classList.add('editor');
    
                    // Añadir un manejador de eventos al hacer clic en la papelera
                    eliminarObra.onclick = () => {
                        this.pulsarBorrar(obra.id);
                    };
    
                    const lapizLink = document.createElement('img');
                    lapizLink.src = 'imagenes/edit.png';
                    lapizLink.alt = 'Editar Obra';
                    lapizLink.id = 'papelera';
                    lapizLink.classList.add('editor');
                    lapizLink.onclick = () => {
                        this.pulsarEditar(obra);
                    };
                    
                    // Añadir checkbox para seleccionar el autor
                    const checkboxSeleccion = document.createElement('input');
                    checkboxSeleccion.type = 'checkbox';
                    checkboxSeleccion.addEventListener('change', () => this.seleccionarObra(obra.id));

                    const favLibro = document.createElement('img');
                    favLibro.src = this.comprobarSiLibroEsFavorito(obra.id) ? 'imagenes/favorite.png' : 'imagenes/favorite01.png';
                    favLibro.id = 'papelera';
                    favLibro.classList.add('editor');

                    favLibro.onclick = () => {
                        this.cambiarEstadoLibro(obra.id, favLibro);
                    };

                    // Agregar elementos al cardContent
                    
                    cardContent.appendChild(obraElement);
                    
    
                    // Agregar elementos al cardElement
                    cardElement.appendChild(checkboxSeleccion)
                    cardElement.appendChild(cardContent);
                    cardContent.appendChild(opciones)
                    opciones.appendChild(eliminarObra);
                    opciones.appendChild(lapizLink);
                    opciones.appendChild(favLibro);
                    // Agregar la card al divScrollLateral
                    divScrollLateral.appendChild(cardElement);
                });
            } else {
                console.log('No se pudo obtener la lista de obras');
            }
        } catch (error) {
            console.error('Error al visualizar los libros:', error);
        }
    }
    
    async pulsarCrear() {
        this.controlador.verVista(Vista.vistainsertarlibro);
        const vistaInsertarLibro = new VistaInsertarLibro(this.controlador);
        vistaInsertarLibro.llenarDesplegableAutores();
    }

    async pulsarBorrar(idObra) {
        await this.datos.borrarObra(idObra);
        this.controlador.pulsarLibro();
    }

    async pulsarObra() { 
        this.libroseleccionado = this.obra.id_autor;
        const vistaListarAutor = new VistaListarAutor(this.controlador, this.base, this.obraseleccionada);
       
        this.datosobra.rellenarObra(this.obra);
        this.controlador.verVista(Vista.vistalibro);
    }

    async pulsarEditar(obra){
        this.controlador.verVista(Vista.vistaeditarlibro)
        const vistaEditarLibro = new VistaEditarLibro(obra)
        vistaEditarLibro.rellenar(obra, this.controlador)
    }


    /**---------------------------GESTION DE COOKIES----------------------- */

    cambiarEstadoLibro(idLibro, favLibro) {
        const libroFavorito = this.comprobarCookie('Id_Libro_Fav_' + idLibro) === 'true';
    
        if (libroFavorito) {
            this.quitarFavorito(idLibro, favLibro);
        } else {
            this.agregarFavorito(idLibro, favLibro);
        }
    
        // Actualizar la imagen del icono de favorito según el estado actual
        favLibro.src = this.comprobarSiLibroEsFavorito(idLibro) ? 'imagenes/favorite.png' : 'imagenes/favorite01.png';
    }

    agregarFavorito(idLibro) {
        const librosFavoritos = this.obtenerCookieArray('Libros_Favoritos');
        
        // Verificar si el libro ya está en favoritos
        const index = librosFavoritos.indexOf(idLibro);
        if (index === -1) {
            librosFavoritos.push(idLibro);
            this.colocarCookieArray('Libros_Favoritos', librosFavoritos);
        } else {
            librosFavoritos.splice(index, 1); // Eliminar el libro si ya está en favoritos
            this.colocarCookieArray('Libros_Favoritos', librosFavoritos);
        }
    
        // No es necesario cambiar la imagen del icono de favorito aquí
    }

    colocarCookieArray(nombre, array) {
        const valor = JSON.stringify(array);
        document.cookie = nombre + "=" + valor + ";path=/";
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

    quitarFavorito(idLibro, favLibro) {
        const librosFavoritos = this.obtenerCookieArray('Libros_Favoritos');
        const indice = librosFavoritos.indexOf(idLibro);
        if (indice !== -1) {
            librosFavoritos.splice(indice, 1);
            this.colocarCookieArray('Libros_Favoritos', librosFavoritos);
        }
        favLibro.src = 'imagenes/favorite01.png';
    }

    comprobarSiLibroEsFavorito(idLibro) {
        const librosFavoritos = this.obtenerCookieArray('Libros_Favoritos');
        return librosFavoritos.includes(idLibro);
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

    inicializarCookies() {
        if (!this.obtenerCookieArray('Libros_Favoritos')) {
            this.colocarCookieArray('Libros_Favoritos', []);
        }
    }

    /**------------------------------- BORRADO MULTIPLE ---------------------------- */

     

    seleccionarTodasObras() {
        const checkboxEstado = this.checkboxSeleccionarTodasObras.checked;
        this.seleccionados.clear();

        if (checkboxEstado) {
            this.listaMostrada.forEach((obra) => {
                this.seleccionados.add(obra.id);
            });
        }

        this.actualizarEstadoBotonBorrar();
    }

    seleccionarObra(idObra) {
        if (this.seleccionados.has(idObra)) {
            this.seleccionados.delete(idObra);
        } else {
            this.seleccionados.add(idObra);
        }

        this.checkboxSeleccionarTodasObras.checked = this.seleccionados.size === this.listaMostrada.length;

        this.actualizarEstadoBotonBorrar();
    }

    actualizarEstadoBotonBorrar() {
        const borrarSeleccionados = document.getElementById('borrar-seleccionados');
        borrarSeleccionados.disabled = this.seleccionados.size === 0;
    }


    async borrarObrasSeleccionadas() {
        if (this.seleccionados.size === 0) {
            this.mostrarMensaje('Selecciona al menos una obra para borrar.');
            return;
        }
    
        const respuesta = await this.mostrarConfirmacion('¿Estás seguro de que deseas borrar las obras seleccionados?');
    
        if (respuesta) {
            const idsSeleccionados = Array.from(this.seleccionados);
            await this.datos.borrarObra(idsSeleccionados);
            this.controlador.pulsarLibro();
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
