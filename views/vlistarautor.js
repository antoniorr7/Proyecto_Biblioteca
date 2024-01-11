import { Vista } from './vista.js'
import { Modelo } from "../models/modelo.js";
export class ListarAutor extends Vista {

  constructor (controlador, base) {
    super(controlador, base)
    this.datos = new Modelo()
  }
 visualizarAutor(){
  const autores = this.datos.mostrarAutor()
  console.log('este es el modelo: ' + autores)
 }
}