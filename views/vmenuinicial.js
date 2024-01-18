import { Vista } from './vista.js';

export class MenuInicial extends Vista {

  constructor(controlador, base) {
    super(controlador, base)

    const imgInf = document.createElement('img')
    imgInf.src = '../imagenes/Yg6I.gif'
    imgInf.alt = 'Informacion'
    imgInf.classList.add('flecha')

    imgInf.onclick = () => this.pulsarInformacion()

    const gifDiv = document.getElementById('gif')
    gifDiv.appendChild(imgInf)
  }

  pulsarInformacion(){
    this.controlador.verVista(Vista.vistainformacion);
  }
}
