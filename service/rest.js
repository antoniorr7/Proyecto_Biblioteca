export class Rest {
    constructor() {
        this.baseUrl = 'https://migueljaque.com/fanlib/v1';
        this.token = 's9bjpJIw6Q';
        this.headers = {
            'Fanlibtoken': this.token,
            'Content-Type': 'application/json'
        };
        
    }

    async getAutor() {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers,
                mode: 'cors'  // Agregar esta línea para manejar CORS
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async getAutorPorId(id) {
        try {
            const url = `${this.baseUrl}/autor/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async crearAutor(autorData) {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(autorData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async actualizarAutor(autorData) {
        try {
            const url = `${this.baseUrl}/autor`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(autorData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async borrarAutor(id) {
        console.log('rest: ' + id)
        try {
            const url = `${this.baseUrl}/autor/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
    async getObra() {
        try {
            const url = `${this.baseUrl}/obra`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers,
                mode: 'cors'  // Agregar esta línea para manejar CORS
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async getObraPorId(id) {
        try {
            const url = `${this.baseUrl}/obra/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async crearObra(obraData) {
        try {
            const url = `${this.baseUrl}/obra`;
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(obraData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async actualizarObra(obraData) {
        try {
            const url = `${this.baseUrl}/obra`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(obraData)
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async borrarObra(id) {
        try {
            const url = `${this.baseUrl}/obra/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.headers
            });

            return this.handleResponse(response);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }
}

