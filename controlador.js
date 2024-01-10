import {Modelo} from './models/modelo.js'
import { MenuInicial } from './views/vmenuinicial.js';
import { ModificarLibro } from './views/vmodificarlibro.js';
import { ModificarAutor } from './views/vmodificarautor.js';
import { ListarAutor } from './views/vlistarautor.js';
import { ListarLibro } from './views/vlistarlibro.js';
import {Vista} from './views/vista.js'

class Controlador {
    vistas = new Map();

    constructor () {
        this.modelo = new Modelo()

        //conseguimos la referencia de la interface
        const divMenuInicial = document.getElementById('divMenuInicial')
        const divListarAutor = document.getElementById('divListarAutor')
        const divListarLibro = document.getElementById('divListarLibro')
        const divModificarAutor = document.getElementById('divModificarAutor')
        const  divModificarLibro= document.getElementById('divModificarLibro')

    
        //Creamos las vistas 
        this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
        this.vistas.set(Vista.vlistarlibro, new ListarLibro(this, divListarLibro))
        this.vistas.set(Vista.vlistarautor, new ListarAutor(this, divListarAutor))
        this.vistas.set(Vista.vmodificarautor, new ModificarAutor(this, divModificarAutor))
        this.vistas.set(Vista.vmodificarlibro, new ModificarLibro (this, divModificarLibro))

        
        this.verVista(Vista.vmenuinicial)

        const inicio = document.getElementsByName('button')[0] 
        const libros  = document.getElementsByName('button')[1] 
        const autores = document.getElementsByName('button')[2] 
        
        inicio.onclick = this.pulsarInicio.bind(this);
        libros.onclick = this.pulsarLibro.bind(this);
        autores.onclick = this.pulsarAutor.bind(this);
    
    }

    pulsarInicio(){
        this.verVista(Vista.vmenuinicial)
    }

    pulsarLibro(){
        this.verVista(Vista.vlistarlibro)
    }

    pulsarAutor(){
        this.verVista(Vista.vlistarautor)
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