import axios from 'axios';
import * as jwtDecode from 'jwt-decode';



class AuthService {
    // Récupération du token stocké dans le localStorage
    getToken() {
        return localStorage.getItem("token");
    }

    // Sauvegarde le token dans le localStorage
    saveToken(token) {
        localStorage.setItem("token", token);
    }

    // Supprime le token du localStorage
    removeToken() {
        localStorage.removeItem("token");
    }

    // Vérifie si l'utilisateur est authentifié en vérifiant la présence d'un token
    isAuthenticated() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token); 
    }

    // Vérifie si le token est expiré
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            return Date.now() >= decoded.exp * 1000; 
        } catch (err) {
            console.error("Erreur lors de la vérification du token :", err);
            return true;
        }
    }

    // Connecte l'utilisateur
    async login(email, password) {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password
            });

            if (response.status === 200) {
                const { token } = response.data;
                this.saveToken(token);
                return response;
            } else {
                throw new Error("Erreur lors de la connexion");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            throw error;
        }
    }

    // Rafraîchit le token si nécessaire
    async refreshToken() {
        try {
            const token = this.getToken();
            if (!token || this.isTokenExpired(token)) {
                const response = await axios.post("http://localhost:8080/api/auth/refresh", {}, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 200) {
                    const { newToken } = response.data;
                    this.saveToken(newToken);
                    return newToken;
                } else {
                    throw new Error("Erreur lors du rafraîchissement du token");
                }
            }
            return token;
        } catch (error) {
            console.error("Erreur lors du rafraîchissement du token :", error);
            this.logout(); // Déconnecte l'utilisateur en cas d'erreur
            throw error;
        }
    }

    // Récupère le profil utilisateur
    async fetchUserProfile() {
        try {
            const token = await this.refreshToken();

            const response = await axios.get("http://localhost:8080/api/user/profile", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const userData = response.data;
                console.log("Profil utilisateur récupéré :", userData);
                return userData;
            } else {
                throw new Error("Erreur lors de la récupération du profil utilisateur");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du profil utilisateur :", error.message);
            throw error;
        }
    }

    // Déconnecte l'utilisateur en supprimant le token
    logout() {
        this.removeToken();
        // Optionnel : redirection ou nettoyage supplémentaire
    }
}

export default new AuthService();
