import { Vista } from './vista.js'
import { Modelo } from '../models/modelo.js'

export class VistaListarLibro extends Vista {
    constructor(controlador, base) {
        super(controlador, base)
        this.datos = new Modelo()
    }

    async visualizarLibro() {
        const obras = await this.datos.mostrarObra()

        if (obras) {
            const divListarLibro = document.getElementById('divListarLibro')
            divListarLibro.innerHTML = ''

            obras.forEach((obra) => {
                const obraElement = document.createElement('div');
                obraElement.textContent = `Título: ${obra.titulo} | Fecha Publicacion: ${obra.fecha_publicacion} | Reseña: ${obra.reseña} | Género: ${obra.genero}`;
                divListarLibro.appendChild(obraElement);
            });
            
        } else {
            console.log('No se pudo obtener la lista de obras')
        }
    }
}