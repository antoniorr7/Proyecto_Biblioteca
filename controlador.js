import { Modelo } from './models/modelo.js';
import { MenuInicial } from './views/vmenuinicial.js';
import { ModificarLibro } from './views/vmodificarlibro.js';
import { ModificarAutor } from './views/vmodificarautor.js';
import { ListarAutor } from './views/vlistarautor.js';
import { ListarLibro } from './views/vlistarlibro.js';
import { CrearAutor } from './views/vcrearautor.js';
import { CrearLibro } from './views/vcrearlibro.js';
import { Vista } from './views/vista.js';

export class Controlador {
    vistas = new Map()
   

    constructor() {
        this.modelo = new Modelo()
        

        //conseguimos la referencia de la interface
        const divMenuInicial = document.getElementById('divMenuInicial')
        const divListarAutor = document.getElementById('divListarAutor')
        const divListarLibro = document.getElementById('divListarLibro')
        const divModificarAutor = document.getElementById('divModificarAutor')
        const  divModificarLibro= document.getElementById('divModificarLibro')
        const divCrearAutor = document.getElementById('divCrearAutor')
        const  divCrearLibro = document.getElementById('divCrearLibro')

    
        //Creamos las vistas 
        this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
        this.vistas.set(Vista.vlistarlibro, new ListarLibro(this, divListarLibro))
        this.vistas.set(Vista.vlistarautor, new ListarAutor(this, divListarAutor))
        this.vistas.set(Vista.vmodificarautor, new ModificarAutor(this, divModificarAutor))
        this.vistas.set(Vista.vmodificarlibro, new ModificarLibro (this, divModificarLibro))
        this.vistas.set(Vista.vcrearautor, new CrearAutor(this, divCrearAutor))
        this.vistas.set(Vista.vcrearlibro, new CrearLibro (this, divCrearLibro))

        
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
        this.vistas.get(Vista.vlistarlibro).visualizarLibro()
        this.verVista(Vista.vlistarlibro)
    }
    

    async pulsarAutor(){
        await this.modelo.mostrarAutor()
        this.vistas.get(Vista.vlistarautor).visualizarAutor()
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