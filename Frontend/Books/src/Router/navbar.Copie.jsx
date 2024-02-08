import React from "react";
import { Link } from "react-router-dom";
import "../Css/Normalize.css";
import "./navbar.css";
import HomeLogo from "../Logos/home.png";
import LivreFermeLogo from "../Logos/livreFerme1.png";
import BiblioLogo from "../Logos/biblio1.png";
import LivreOuvertLogo from "../Logos/livreOuvert1.png";
import AuthService from "../services/AuthService"; // Importez le service AuthService

const Navbar = () => {
    const isAuthenticated = AuthService.isAuthenticated(); // Vérifiez si l'utilisateur est connecté  const isAuthenticated = AuthService.isAuthenticated();

    const handleLogout = () => {
        AuthService.logout();
        // Redirigez l'utilisateur vers la page de connexion après la déconnexion
        window.location.href = "/login";
    };

    return (
        <nav>
            <div>
                <ul>
                    <li>
                        <Link to="/">
                            <img className="HomeLog" src={HomeLogo} alt="Logo Accueil" />
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link to="/BookToBuy">
                            <img
                                className="LivreFermeLogo"
                                src={LivreFermeLogo}
                                alt="Logo Livre Fermé"
                            />
                            Livres à acheter
                        </Link>
                    </li>
                    <li>
                        <Link to="/BookToRead">
                            <img
                                className="LivreOuvertLogo"
                                src={LivreOuvertLogo}
                                alt="Logo Livre Ouvert"
                            />
                            Livres à lire
                        </Link>
                    </li>
                    <li>
                        <Link to="/ReadLibrary">
                            <img
                                className="BiblioLogo"
                                src={BiblioLogo}
                                alt="Logo Biblio"
                            />
                            Bibliothèque
                        </Link>
                    </li>
                    <li>
                        {/* Utilisez une expression ternaire pour déterminer le libellé du bouton */}
                        {isAuthenticated ? (
                            <Link to="/" onClick={handleLogout}>
                                Se Déconnecter
                            </Link>
                        ) : (
                            <Link to="/login">Se Connecter</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
