export class GestionCookies {
    inicializarCookies(nombre) {
        if (!this.obtenerCookieArray(nombre)) {
            this.colocarCookieArray(nombre, []);
        }
    }

    obtenerCookieArray(nombre) {
        const nombreCookie = nombre + "=";
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nombreCookie) == 0) {
                const valor = cookie.substring(nombreCookie.length);
                return JSON.parse(valor);
            }
        }
        return [];
    }

    colocarCookieArray(nombre, array) {
        const valor = JSON.stringify(array);
        document.cookie = nombre + "=" + valor + ";path=/";
    }

    comprobarCookie(nombre) {
        const nombreCookie = nombre + "=";
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nombreCookie) == 0) {
                return cookie.substring(nombreCookie.length, cookie.length);
            }
        }
        return "";
    }
}
