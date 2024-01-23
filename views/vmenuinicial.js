import { Vista } from './vista.js';

export class MenuInicial extends Vista {

  constructor(controlador, base) {
    super(controlador, base);

    const gifDiv = document.getElementById('gif');

    gifDiv.onclick = () => this.pulsarInformacion();
    const cookieFecha = document.getElementById('horaCookie');
    // Utilizamos document.cookie para acceder a las cookies y comprobamos si está en un contexto seguro
    if (this.isSecureContext() && document.cookie.includes("fecha")) {
      cookieFecha.textContent = "Hola, tu última visita fue " + this.getCookie("fecha");
    } else {
      // Si no hay cookie, establecemos una nueva
      const lastVisitDate = this.getCookie("fecha");
      if (!lastVisitDate) {
        this.setCookie("fecha", this.fecha(), this.time() + 31536000);
        cookieFecha.textContent = "Hola, esta es tu primera visita";
      }
    }
  }

  pulsarInformacion() {
    this.controlador.verVista(Vista.vistainformacion);
  }

  // Agregamos la función fecha para obtener la fecha actual
  fecha() {
    const currentDate = new Date();
    return currentDate.toUTCString();
  }

  // Agregamos la función time para obtener el tiempo actual en segundos
  time() {
    return Math.floor(Date.now() / 1000);
  }

  // Agregamos la función setCookie para establecer una cookie
  setCookie(name, value, expiration) {
    document.cookie = `${name}=${value}; expires=${new Date(expiration * 1000).toUTCString()}; path=/`;
  }

  // Agregamos la función getCookie para obtener el valor de una cookie
  getCookie(name) {
    const cookieArray = document.cookie.split('; ');
    for (const cookie of cookieArray) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return '';
  }

  // Agregamos la función isSecureContext para verificar si estamos en un contexto seguro
  isSecureContext() {
    return window.isSecureContext;
  }
}
