import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Normalize.css";
import "./navbar.css";
import HomeLogo from "../Logos/home.png";
import LivreFermeLogo from "../Logos/livreFerme1.png";
import BiblioLogo from "../Logos/biblio1.png";
import LivreOuvertLogo from "../Logos/livreOuvert1.png";
import AuthService from "../services/AuthService"; // Importez le service AuthService
import { useAuth } from "../services/AuthContext";
import ReadLog from "../Logos/readeaselogo.png";

const Navbar = () => {
    // const isAuthenticated = AuthService.isAuthenticated(); // Vérifiez si l'utilisateur est connecté  const isAuthenticated = AuthService.isAuthenticated();

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    // const [profileImage, setProfileImage] = useState(null);//a revenir une fois que j'aurais regler le problème du frontend register
    const [forceUpdate, setForceUpdate] = useState(null);

    useEffect(() => {
        // setIsAuthenticated(AuthService.isAuthenticated());

        // Ajouter un écouteur d'événements pour forcer la mise à jour lorsque le localStorage change
        const updateAuthStatus = () => {
            setIsAuthenticated(AuthService.isAuthenticated());
            // setProfileImage(AuthService.getProfileImagePath());
            setForceUpdate((u) => u + 1); // Incrémente pour forcer le re-rendu
        };

        window.addEventListener("storage", updateAuthStatus);
        return () => window.removeEventListener("storage", updateAuthStatus);
    }, [setIsAuthenticated]);

    const handleLogout = () => {
        AuthService.logout();
        setIsAuthenticated(AuthService.isAuthenticated());
        setForceUpdate((u) => u + 1); // Incrémente également ici pour forcer le re-rendu
        navigate("/login");
    };

    return (
        <nav>
            <div>
                {isAuthenticated ? (
                    // Barre de navigation pour l'utilisateur connecté
                    <ul>
                        <li>
                            <img className="ReadLog" src={ReadLog} alt="ReadLog" />
                        </li>
                        <li>
                            <Link to="/">
                                <img
                                    className="HomeLog"
                                    src={HomeLogo}
                                    alt="Logo Accueil"
                                />
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
                        {/* <li>
                            {profileImage && (
                                <img
                                    className="ProfileImage"
                                    src={profileImage}
                                    alt="Profile"
                                />
                            )}
                        </li> */}
                        <li>
                            <Link to="/" onClick={handleLogout}>
                                Se Déconnecter
                            </Link>
                        </li>
                    </ul>
                ) : (
                    // Barre de navigation pour l'utilisateur déconnecté
                    <ul>
                        <li>
                            <img className="ReadLog" src={ReadLog} alt="ReadLog" />
                        </li>
                        <li>
                            <Link to="/">
                                <img
                                    className="HomeLog"
                                    src={HomeLogo}
                                    alt="Logo Accueil"
                                />
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">Se Connecter</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
