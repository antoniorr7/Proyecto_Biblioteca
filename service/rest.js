export class Rest {
    constructor() {
        this.baseUrl = 'https://api.postman.com/collections/32219671-26dbbdc7-1ffd-4f50-ba4e-a3881f874103?access_key=PMAT-01HKS9V3KKWXSPRMFZHC9QVM5E&authuser=1';
        this.token = 'testToken';
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
                headers: this.headers
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
}
