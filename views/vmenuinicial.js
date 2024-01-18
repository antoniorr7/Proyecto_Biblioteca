import { Vista } from './vista.js';

export class MenuInicial extends Vista {

  constructor(controlador, base) {
    super(controlador, base)

   
    const gifDiv = document.getElementById('gif')
    

    gifDiv.onclick = () => this.pulsarInformacion()

    
  }

  pulsarInformacion(){
    this.controlador.verVista(Vista.vistainformacion);
  }
}
