import { Vista } from './vista.js';
import { ModeloObra } from '../models/modeloobra.js';
import { VistaLibro } from '../views/vistalibro.js';
import { VistaListarAutor } from '../views/vistalistarautor.js';
import { VistaEditarLibro } from '../views/vistaeditarlibro.js';
// Función para establecer una cookie
function colocarCookie(nombre, valor) {
    document.cookie = nombre + "=" + valor + ";path=/";
}


export class VistaListarLibro extends Vista {
    constructor(controlador, base, autorseleccionado) {
        super(controlador, base);
        this.datos = new ModeloObra();
        this.datosobra = new VistaLibro();
        this.autorseleccionado = autorseleccionado;

        this.listaMostrada = [];

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
            alert('Selecciona al menos una obra para borrar.');
            return;
        }
    
        if (confirm('¿Estás seguro de que deseas borrar las obras seleccionadas?')) {
            const idsSeleccionados = Array.from(this.seleccionados);
            await this.datos.borrarObra(idsSeleccionados);
            this.controlador.pulsarLibro();
        }
    }

    cambiarEstadoLibro(idLibro, favLibro) {
        const libroFavorito = this.comprobarCookie('Id_Libro_Fav_' + idLibro) === 'true';

        if (libroFavorito) {
            this.quitarFavorito(idLibro, favLibro);
        } else {
            this.agregarFavorito(idLibro, favLibro);
        }
    }

    // Función para agregar un libro a favoritos
    agregarFavorito(idLibro, favLibro) {
        favLibro.src = 'imagenes/favorite.png';
        colocarCookie('Id_Libro_Fav_' + idLibro, 'true', 30);
    }

    // Función para quitar un libro de favoritos
    quitarFavorito(idLibro, favLibro) {
        favLibro.src = 'imagenes/favorite01.png';
        colocarCookie('Id_Libro_Fav_' + idLibro, 'false', 30);
        //No entiendo para que es el valor de las cookies
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
    
                //nombre de la cookie = Id_Libro_Fav_1=
                //cookie = Id_Libro_Fav_1=true
                //esto nos devolvera true o false ( para comprobar si la cookie esta activa o no)
            }
        }
        return "";
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
                    favLibro.src = this.comprobarCookie('Id_Libro_Fav_' + obra.id) === 'true' ? 'imagenes/favorite.png' : 'imagenes/favorite01.png';
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
    }

    async pulsarBorrar(idObra) {
        await this.datos.borrarObra(idObra);
        this.controlador.pulsarLibro();
    }

    async pulsarObra() { 
        this.libroseleccionado = this.obra.id_autor;
        const vistaListarAutor = new VistaListarAutor(this.controlador, this.base, this.obraseleccionada);
        vistaListarAutor.visualizarAutor();
        this.datosobra.rellenarObra(this.obra);
        this.controlador.verVista(Vista.vistalibro);
    }

    async pulsarEditar(obra){
        this.controlador.verVista(Vista.vistaeditarlibro)
        const vistaEditarLibro = new VistaEditarLibro(obra)
        vistaEditarLibro.rellenar(obra, this.controlador)
    }
}
