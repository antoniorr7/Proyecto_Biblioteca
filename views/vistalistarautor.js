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
            const tablaAutores = document.getElementById('tabla_autores');
    
            autores.forEach((autor) => {
                const filaAutor = document.createElement('tr');
                
                const nombreTD = document.createElement('td');
                nombreTD.textContent = autor.nombre;
                filaAutor.appendChild(nombreTD);
    
                const fechaNacimientoTD = document.createElement('td');
                fechaNacimientoTD.textContent = autor.fecha_nacimiento;
                filaAutor.appendChild(fechaNacimientoTD);
    
                const fechaMuerteTD = document.createElement('td');
                fechaMuerteTD.textContent = autor.fecha_muerte;
                filaAutor.appendChild(fechaMuerteTD);
    
                const fotoTD = document.createElement('td');
                fotoTD.textContent = autor.foto; // O puedes usar un elemento de imagen si 'foto' es la URL de la imagen
                filaAutor.appendChild(fotoTD);
    
                const nacionalidadTD = document.createElement('td');
                nacionalidadTD.textContent = autor.nacionalidad;
                filaAutor.appendChild(nacionalidadTD);
    
                const borrarTD = document.createElement('td');
                const imgBorrar = document.createElement('img');
                imgBorrar.src = 'imagenes/basura.png';
                borrarTD.appendChild(imgBorrar);
                filaAutor.appendChild(borrarTD);
    
                const editarTD = document.createElement('td');
                const imgEditar = document.createElement('img');
                imgEditar.src = 'imagenes/Lapiz.png';
                editarTD.appendChild(imgEditar);
                filaAutor.appendChild(editarTD);
    
                tablaAutores.appendChild(filaAutor);
            });
        } else {
            console.log('No se pudo obtener la lista de Autores');
        }    
    }
    
    async pulsarCrear() {
        this.controlador.verVista(Vista.vistainsertarautor)
    }
}
