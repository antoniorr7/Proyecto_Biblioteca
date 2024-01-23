import { Vista } from './vista.js';
import { ModeloObra } from '../models/modeloobra.js';
import { VistaLibro } from '../views/vistalibro.js';
import { VistaListarAutor } from '../views/vistalistarautor.js';

// Función para establecer una cookie
function colocarCookie(nombre, valor) {
    document.cookie = nombre + "=" + valor + ";path=/";
}

// Función para obtener el valor de una cookie por nombre


export class VistaListarLibro extends Vista {
    constructor(controlador, base, autorseleccionado) {
        super(controlador, base);
        this.datos = new ModeloObra();
        this.datosobra = new VistaLibro();
        this.autorseleccionado = autorseleccionado;

        const crear = document.getElementById('crearLibro')
        crear.onclick = this.pulsarCrear.bind(this);

        this.obra = null; // Inicializar correctamente
        this.libroseleccionado = null; // Inicializar correctamente
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

                    const detalleLink = document.createElement('button');
                    detalleLink.classList.add('card-button');
                    detalleLink.addEventListener('click', () => {
                        // Implementa la lógica que desees al hacer clic en la obra
                    });
    
                    // Crear el elemento de la imagen usando el campo 'portada' de la obra
                    const portadaImage = document.createElement('img');
                    portadaImage.src = obra.portada; // Utiliza la ruta de la imagen directamente
                    portadaImage.alt = 'Descripción de la imagen';
                    portadaImage.addEventListener('click', () => {
                        this.obra = obra;
                        this.pulsarObra();
                    });

                    // Agregar la imagen al enlace
                    detalleLink.appendChild(portadaImage);
    
                    // Crear un div para el contenido de la card
                    const cardContent = document.createElement('div');
                    cardContent.classList.add('card-content');
    
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
    
                    const lapizLink = document.createElement('span');
                    lapizLink.href = 'formulario-libros.html';
                    lapizLink.innerHTML = `<img id="lapiz" src="imagenes/edit.png" alt="Editar">`;
                    lapizLink.onclick = () => {
                        this.pulsarEditar(obra);
                    };

                    const favLibro = document.createElement('img');
                    favLibro.src = this.comprobarCookie('Id_Libro_Fav_' + obra.id) === 'true' ? 'imagenes/favorite.png' : 'imagenes/favorite01.png';
                    favLibro.id = 'papelera';
                    favLibro.classList.add('editor');
                    
                    favLibro.onclick = () => {
                        this.cambiarEstadoLibro(obra.id, favLibro);
                    };

                    // Agregar elementos al cardContent
                    cardContent.appendChild(obraElement);
                    cardContent.appendChild(eliminarObra);
                    cardContent.appendChild(lapizLink);
                    cardContent.appendChild(favLibro);
    
                    // Agregar elementos al cardElement
                    cardElement.appendChild(detalleLink);
                    cardElement.appendChild(cardContent);
                    cardElement.appendChild(favLibro);
    
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

    async pulsarEditar(obra) {
        console.log(obra);
    }
}
