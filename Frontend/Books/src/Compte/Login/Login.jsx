import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs/inputs";
import Register from "../Register/Register";
import "../../Css/login.css";

// Définition du composant de connexion (Login)
const Login = (props) => {
    // État pour suivre si l'utilisateur est déjà enregistré ou non
    const [isRegistered, setIsRegistered] = useState(false);
    // Utilisation du hook useNavigate pour la navigation dans React Router
    const navigate = useNavigate();
    // État pour stocker les valeurs des champs de saisie (email et mot de passe)
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });

    // État pour suivre si l'utilisateur est connecté
    const [isLoggedIn, setLoggedIn] = useState(false);

    // Fonction pour mettre à jour les valeurs des champs de saisie
    const handleChange = (name, val) => {
        setInputValue((prevState) => ({ ...prevState, [name]: val }));
    };

    // Fonction de gestion de la soumission du formulaire de connexion
    const handleLogin = (e) => {
        e.preventDefault();
        // Simulation de l'authentification réussie
        const isAuthenticated = true;
        // verification de connexion et que la db soit bien connecté . Contacter le back_End et envoyer le mot de passe et validateur et verifier si l utilisateur existe si le tt est correcte reponse status 200 et moi si je recois une réponse 200 redirigé vers un etat de connexion si pas redirection.

        // Si l'authentification réussit, mettre à jour l'état pour indiquer que l'utilisateur est connecté
        if (isAuthenticated) {
            setLoggedIn(true);
        }
    };

    // Si l'utilisateur est connecté, rediriger vers la page d'accueil
    if (isLoggedIn) {
        return navigate("/");
    }

    // Rendu conditionnel basé sur l'état isRegistered
    return (
        <>
            {isRegistered ? (
                // Si l'utilisateur n'est pas encore enregistré, afficher le composant d'inscription
                <Register setIsRegistered={setIsRegistered} />
            ) : (
                // Sinon, afficher le formulaire de connexion
                <>
                    <form className="log" onSubmit={handleLogin}>
                        <div className="logout">
                            <label htmlFor="Email"></label>
                            <Input
                                label="Email :"
                                type="text"
                                name="email"
                                className="input"
                                value={inputValue.email}
                                onChange={(val) => handleChange("email", val)}
                            />

                            {/* <label htmlFor='Password'> */}
                            <label htmlFor="password"></label>
                            <Input
                                label="Mot de passe :"
                                type="password"
                                name="password"
                                className="input"
                                value={inputValue.password}
                                onChange={(val) => handleChange("password", val)}
                            />
                        </div>
                        <div className="log_register">
                            <button className="connexion" type="submit">
                                Connexion
                            </button>
                            <button
                                className="register"
                                onClick={() => setIsRegistered(true)}
                            >
                                Pas encore membre ? Inscrivez-vous ici !
                            </button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

// Définition des types de propriétés attendues par le composant
Login.propTypes = {
    isRegistered: PropTypes.bool,
    setIsRegistered: PropTypes.func,
};

export default Login;
