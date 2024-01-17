import { Vista } from './vista.js';
import { ModeloObra } from '../models/modeloobra.js';

export class VistaListarLibro extends Vista {
    constructor(controlador, base) {
        super(controlador, base);
        this.datos = new ModeloObra();

        const crear = document.getElementById('crearLibro')
        crear.onclick = this.pulsarCrear.bind(this)
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
    
                    // Crear un enlace para el detalle de la obra
                    const detalleLink = document.createElement('a');
                    detalleLink.href = 'libro.html';
    
                    // Crear el elemento de la imagen usando el campo 'portada' de la obra
                    const portadaImage = document.createElement('img');
                    portadaImage.src = obra.portada; // Utiliza la ruta de la imagen directamente
                    portadaImage.alt = 'Descripción de la imagen';
    
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
                    eliminarObra.src = 'imagenes/papelera.png';
                    eliminarObra.alt = 'Eliminar Obra';
                    eliminarObra.id = 'papelera';
                    eliminarObra.classList.add('editor');
    
                    // Añadir un manejador de eventos al hacer clic en la papelera
                    eliminarObra.onclick = () => {
                        console.log(obra.id)
                        this.pulsarBorrar(obra.id);
                    };
    
                    const lapizLink = document.createElement('a');
                    lapizLink.href = 'formulario-libros.html';
                    lapizLink.innerHTML = `<img id="lapiz" src="imagenes/lapiz.png" alt="Editar">`;
    
                    // Agregar elementos al cardContent
                    cardContent.appendChild(obraElement);
                    cardContent.appendChild(eliminarObra);
                    cardContent.appendChild(lapizLink);
    
                    // Agregar elementos al cardElement
                    cardElement.appendChild(detalleLink);
                    cardElement.appendChild(cardContent);
    
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
        this.controlador.verVista(Vista.vistainsertarlibro)
    }

    async pulsarBorrar(idObra) {
        // Llamar al método borrarAutor con el id del autor
        console.log("idObra: " + idObra)
        await this.datos.borrarObra(idObra);
    }
}
