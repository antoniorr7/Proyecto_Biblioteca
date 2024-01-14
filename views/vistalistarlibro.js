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
    
                    // Crear un enlace para la imagen
                    const imgLink = document.createElement('a');
                    imgLink.href = 'libro.html';
                    imgLink.innerHTML = `<img src="imagenes/111.jpg" alt="Descripción de la imagen">`;
    
                    // Crear un div para el contenido de la card
                    const cardContent = document.createElement('div');
                    cardContent.classList.add('card-content');
    
                    // Crear un h3 para el título de la obra
                    const obraElement = document.createElement('h3');
                    obraElement.textContent = `Título: ${obra.titulo}`;
    
                    // Crear enlaces para la papelera y el lápiz
                    const papeleraLink = document.createElement('a');
                    papeleraLink.href = '';
                    papeleraLink.innerHTML = `<img id="papelera" src="imagenes/basura.png" alt="Borrar">`;
    
                    const lapizLink = document.createElement('a');
                    lapizLink.href = 'formulario-libros.html';
                    lapizLink.innerHTML = `<img id="lapiz" src="imagenes/lapiz.png" alt="Editar">`;
    
                    // Agregar elementos al cardContent
                    cardContent.appendChild(obraElement);
                    cardContent.appendChild(papeleraLink);
                    cardContent.appendChild(lapizLink);
    
                    // Agregar elementos al cardElement
                    cardElement.appendChild(imgLink);
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
}
