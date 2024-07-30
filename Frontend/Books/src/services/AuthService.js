class AuthService {
    // Récupèration du token stocké dans le localStorage
    getToken() {
        return localStorage.getItem("token");
    }

    // Sauvegarde le token dans le localStorage
    saveToken(token) {
        localStorage.setItem("token", token);
    }

    // fichier ici et qd co changer la nav pour avoir se deconnecter et une fois cliquer dessus ça applique remove token et redirection ce connecter

    // Supprime le token du localStorage
    removeToken() {
        localStorage.removeItem("token");
    }

    // Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un token
    isAuthenticated() {
        const token = this.getToken();
        return !!token; // Convertit la présence du token en booléen (true si présent, false sinon)
    }

    // Vérification de la validité du token en envoyant une requête au serveur
    // async verifyToken() {
    //     const token = this.getToken();
    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const response = await axios.post('http://localhost:8080/api/auth/verifyToken', { token });
    //         return response.data.valid;
    //     } catch (error) {
    //         console.error('Token verification failed:', error);
    //         return false;
    //     }
    // }

    // Déconnecte l'utilisateur en supprimant le token et éventuellement en redirigeant l'utilisateur
    logout() {
        this.removeToken();
    }
}

export default new AuthService();
