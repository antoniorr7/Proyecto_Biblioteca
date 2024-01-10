import {Modelo} from './modelos/modelo.js'
import {Vista} from './vistas/vista.js'

class Controlador {
    vistas = new Map();

    constructor () {
        this.modelo = new Modelo()

        //conseguimos la referencia de la interface
        const divMenuInicial = document.getElementById('divMenuInicial')
    
        //Creamos las vistas 
        this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
    
        this.verVista(Vista.vmenuinicial)
    }

    verVista (vista) {
        this.ocultarVistas()
        this.vistas.get(vista).mostrar(true)
    }
    
    ocultarVistas(){
        for(const vista of this.vistas.values())
            vista.mostrar(false)
    }

}

window.onload = () => {new Controlador()}