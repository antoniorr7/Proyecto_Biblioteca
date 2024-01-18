import { Vista } from './vista.js';


export class VistaInformacion extends Vista {
  constructor(controlador, base) {
    super(controlador, base);

    const imgFlecha = document.getElementById('flecha');
    // Añadir un manejador de eventos al hacer clic en la papelera
    imgFlecha.onclick = () => this.pulsarAtras();
  }

  pulsarAtras(){
    this.controlador.verVista(Vista.vmenuinicial);
  }
}