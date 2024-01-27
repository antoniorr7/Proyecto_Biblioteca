import { ModeloObra } from './models/modeloobra.js'
import { ModeloAutor } from './models/modeloautor.js'
import { MenuInicial } from './views/vmenuinicial.js'
import { VistaListarAutor } from './views/vistalistarautor.js'
import { VistaListarLibro } from './views/vistalistarlibro.js'
import { VistaInsertarAutor } from './views/vistainsertarautor.js'
import { VistaInsertarLibro } from './views/vistainsertarlibro.js'
import { VistaInformacion } from './views/vistainformacion.js'
import { VistaLibro } from './views/vistalibro.js'
import { VistaAutor } from './views/vistaautor.js'
import { VistaEditarAutor } from './views/vistaeditarautor.js'
import { VistaEditarLibro } from './views/vistaeditarlibro.js'
import { Vista } from './views/vista.js';

export class Controlador {
    vistas = new Map()
   

    constructor() {
        this.modeloobra = new ModeloObra()
        this.modeloautor = new ModeloAutor()
        

        //conseguimos la referencia de la interface
        const divMenuInicial = document.getElementById('divMenuInicial')
        const divListarAutor = document.getElementById('divListarAutor')
        const divListarLibro = document.getElementById('divListarLibro')
        const divCrearAutor = document.getElementById('divCrearAutor')
        const  divCrearLibro = document.getElementById('divCrearLibro')
        const  divInformacion = document.getElementById('divInformacion')
        const  divLibro = document.getElementById('divLibro')
        const  divAutor = document.getElementById('divAutor')
        const  divEditarAutor = document.getElementById('divEditarAutor')
        const  divEditarLibro = document.getElementById('divEditarLibro')
        

    
        //Creamos las vistas 
        this.vistas.set(Vista.vmenuinicial, new MenuInicial(this, divMenuInicial))
        this.vistas.set(Vista.vistalistarlibro, new VistaListarLibro(this, divListarLibro))
        this.vistas.set(Vista.vistalistarautor, new VistaListarAutor(this, divListarAutor))
        this.vistas.set(Vista.vistainsertarautor, new VistaInsertarAutor(this, divCrearAutor))
        this.vistas.set(Vista.vistainsertarlibro, new VistaInsertarLibro (this, divCrearLibro))
        this.vistas.set(Vista.vistainformacion, new VistaInformacion (this, divInformacion))
        this.vistas.set(Vista.vistalibro, new VistaLibro (this, divLibro))
        this.vistas.set(Vista.vistaautor, new VistaAutor (this, divAutor))
        this.vistas.set(Vista.vistaeditarautor, new VistaEditarAutor (this, divEditarAutor))
        this.vistas.set(Vista.vistaeditarlibro, new VistaEditarLibro (this, divEditarLibro))

        
        this.verVista(Vista.vmenuinicial)

        const inicio = document.getElementById('btnInicio')
        const libros  = document.getElementById('btnLibro')
        const autores = document.getElementById('btnAutor')
        
        inicio.onclick = this.pulsarInicio.bind(this)
        libros.onclick = this.pulsarLibro.bind(this)
        autores.onclick = this.pulsarAutor.bind(this)
            
        lupa.onclick = this.pulsarLupa.bind(this)
    
    }

    pulsarInicio(){
        this.verVista(Vista.vmenuinicial)
    }

    async pulsarLibro() {
        await this.modeloobra.mostrarObra()
        this.vistas.get(Vista.vistalistarlibro).visualizarLibro()
        this.verVista(Vista.vistalistarlibro)
    }
    

    async pulsarAutor() {
         await this.modeloautor.mostrarAutor();
        this.vistas.get(Vista.vistalistarautor).visualizarAutor();
        this.verVista(Vista.vistalistarautor);
    }
    verVista (vista) {
        this.ocultarVistas()
        this.vistas.get(vista).mostrar(true)
    }
    
    ocultarVistas(){
        for(const vista of this.vistas.values())
            vista.mostrar(false)
    }
    pulsarLupa(){
        const lupa = document.getElementById('lupa')
        const buscador = document.getElementById('buscador')
       
            const text = buscador.value; 
          const respuesta = this.modeloautor.cogerBusqueda(text)
           console.log(respuesta)

    }


}

window.onload = () => {new Controlador()}