import { Modelo } from './models/modelo.js'
import { MenuInicial } from './views/vmenuinicial.js'
import { VistaListarAutor } from './views/vistalistarautor.js'
import { VistaListarLibro } from './views/vistalistarlibro.js'
import { VistaInsertarAutor } from './views/vistainsertarautor.js'
import { VistaInsertarLibro } from './views/vistainsertarlibro.js'
import { Vista } from './views/vista.js';

export class Controlador {
    vistas = new Map()
   

    constructor() {
        this.modelo = new Modelo()
        

        //conseguimos la referencia de la interface
        const divMenuInicial = document.getElementById('divMenuInicial')
        const divListarAutor = document.getElementById('divListarAutor')
        const divListarLibro = document.getElementById('divListarLibro')
        const divCrearAutor = document.getElementById('divCrearAutor')
        const  divCrearLibro = document.getElementById('divCrearLibro')

    
        //Creamos las vistas 
        this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
        this.vistas.set(Vista.vistalistarlibro, new VistaListarLibro(this, divListarLibro))
        this.vistas.set(Vista.vistalistarautor, new VistaListarAutor(this, divListarAutor))
        this.vistas.set(Vista.vistainsertarautor, new VistaInsertarAutor(this, divCrearAutor))
        this.vistas.set(Vista.vistainsertarlibro, new VistaInsertarLibro (this, divCrearLibro))

        
        this.verVista(Vista.vmenuinicial)

        const inicio = document.getElementById('btnInicio')
        const libros  = document.getElementById('btnLibro')
        const autores = document.getElementById('btnAutor')
        
        inicio.onclick = this.pulsarInicio.bind(this)
        libros.onclick = this.pulsarLibro.bind(this)
        autores.onclick = this.pulsarAutor.bind(this)
    
    }

    pulsarInicio(){
        this.verVista(Vista.vmenuinicial)
    }

    async pulsarLibro() {
        await this.modelo.mostrarObra()
        this.vistas.get(Vista.vistalistarlibro).visualizarLibro()
        this.verVista(Vista.vistalistarlibro)
    }
    

    async pulsarAutor(){
        await this.modelo.mostrarAutor()
        this.vistas.get(Vista.vistalistarautor).visualizarAutor()
        this.verVista(Vista.vistalistarautor)
       
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