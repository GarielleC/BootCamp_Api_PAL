import React from "react";
import { Link } from "react-router-dom";
import "../Css/Normalize.css";
import "./navbar.css";
import HomeLogo from "../Logos/home.png";
import LivreFermeLogo from "../Logos/livreFerme1.png";
import BiblioLogo from "../Logos/biblio1.png";
import LivreOuvertLogo from "../Logos/livreOuvert1.png";

const Navbar = () => {
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

                    {/* <li>
                    <Link to='/BookToBuy'><img src='../Frontend/Books/src/Logos/livre fermé.png'/> Livres à acheter</Link>
                </li> */}
                    {/* 📘 */}
                    <li>
                        <Link to="/BookToRead">
                            <img
                                className="LivreOuvertLogo"
                                src={LivreOuvertLogo}
                                alt="Logo Livre Ouvert"
                            />
                            Livres à livres
                        </Link>
                    </li>
                    {/* 📖 Livres à livres</Link> */}
                    <li>
                        <Link to="/ReadLibrary">
                            <img
                                className="BiblioLogo"
                                src={BiblioLogo}
                                alt="Logo Biblio"
                            />
                            Bibliothèque
                        </Link>
                        {/* <img className="BiblioLogo" src={BiblioLogo} alt="Logo Biblio" />📚 Bibliothèque</Link> */}
                    </li>
                    <li>
                        <Link to="/login">Se Connecter</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
