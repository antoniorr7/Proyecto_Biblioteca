import { Vista } from './vista.js';


export class VistaInformacion extends Vista {
  constructor(controlador, base) {
    super(controlador, base);

    const imgFlecha = document.createElement('img');
    imgFlecha.src = 'imagenes/papelera.png';
    imgFlecha.alt = 'Atras';
    imgFlecha.classList.add('flecha');

    // Añadir un manejador de eventos al hacer clic en la papelera
    imgFlecha.onclick = () => this.pulsarAtras();
  }

  pulsarAtras(){
    this.controlador.verVista(Vista.vmenuinicial);
  }
}