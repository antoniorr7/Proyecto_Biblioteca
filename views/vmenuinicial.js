import { Vista } from './vista.js';

export class MenuInicial extends Vista {

  constructor(controlador, base) {
    super(controlador, base);

    const gifDiv = document.getElementById('gif');
    gifDiv.addEventListener('click', () => this.pulsarInformacion());

    const cookieFecha = document.getElementById('horaCookie');
    const estadoCookies = document.getElementById('estadoCookies');
    const areCookiesEnabled = this.getCookie("cookies_enabled") === "true";

    // Obtener elementos para el banner de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');

    // Verificar si los elementos existen antes de agregar eventos
    if (acceptButton && rejectButton) {
      acceptButton.addEventListener('click', () => this.handleCookieDecision(true));
      rejectButton.addEventListener('click', () => this.handleCookieDecision(false));
    }

    if (this.isSecureContext()) {
      if (areCookiesEnabled) {
        const lastVisitDate = this.getCookie("fecha");
        if (lastVisitDate) {
          cookieFecha.textContent = "Hola, tu última visita fue " + this.formatDate(lastVisitDate);
        } else {
          this.setCookie("fecha", this.getCurrentDate(), this.getExpirationTime());
          cookieFecha.textContent = "Hola, esta es tu primera visita";
        }
        estadoCookies.textContent = "Cookies Activadas";
        console.log(areCookiesEnabled);
      } else {
        cookieFecha.textContent = "Las cookies están desactivadas. La información de la fecha/hora no está disponible.";
        estadoCookies.textContent = "Cookies Desactivadas";

        // Mostrar el banner de cookies solo si las cookies están desactivadas
        if (cookieBanner) {
          cookieBanner.style.display = 'block';
        }
      }
    }

    const cookieOption = document.getElementById('activar-desactivar-cookies');
    if (cookieOption) {
      cookieOption.addEventListener('click', () => this.toggleCookies());
    }
  }

  toggleCookies() {
    const areCookiesEnabled = this.getCookie("cookies_enabled") === "true";
    const enableCookies = confirm('¿Quieres habilitar las cookies?');

    if (enableCookies) {
      this.setCookie('cookies_enabled', 'true', this.getExpirationTime());
      this.setCookie('fecha', this.getCurrentDate(), this.getExpirationTime());
      alert('Cookies habilitadas. ¡Bienvenido!');
    } else {
      this.setCookie('cookies_enabled', 'false', this.getExpirationTime());
      this.deleteCookie('fecha');
      alert('Cookies desactivadas. Algunas funciones pueden no estar disponibles.');
    }

    // Ocultar el banner de cookies después de la decisión
    document.getElementById('cookie-banner').style.display = 'none';

    // Recargar la página para reflejar el cambio en el mensaje de fecha/hora
    window.location.reload();
  }

  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  pulsarInformacion() {
    this.controlador.verVista(Vista.vistainformacion);
  }

  getCurrentDate() {
    return new Date().toUTCString();
  }

  getExpirationTime() {
    return this.getCurrentTime() + 31536000;
  }

  getCurrentTime() {
    return Math.floor(Date.now() / 1000);
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }

  setCookie(name, value, expiration) {
    document.cookie = `${name}=${value}; expires=${new Date(expiration * 1000).toUTCString()}; path=/`;
  }

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

  isSecureContext() {
    return window.isSecureContext;
  }
}
