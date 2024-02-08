class AuthService {
    getToken() {
        return localStorage.getItem("token");
    }

    saveToken(token) {
        localStorage.setItem("token", token);
    }

    // fichier ici et qd co changer la nav pour avoir se deconecter et une fois cliquer dessus ca applique remove token et redirection ce connecter
    removeToken() {
        localStorage.removeItem("token");
    }

    isAuthenticated() {
        const token = this.getToken();
        return !!token; // Convertit la présence du token en booléen (true si présent, false sinon)
    }

    logout() {
        this.removeToken();
    }
}

export default new AuthService();
