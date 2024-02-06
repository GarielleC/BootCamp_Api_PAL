import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs/inputs";
import Register from "../Register/Register";
import "../../Css/login.css";

// Définition du composant de connexion (Login)
const Login = (props) => {
    // Utilisation du hook useNavigate pour la navigation dans React Router
    const navigate = useNavigate();

    // État pour suivre si l'utilisateur est déjà enregistré ou non
    const [isRegistered, setIsRegistered] = useState(false);
    // État pour suivre si l'utilisateur est connecté
    const [isLoggedIn, setLoggedIn] = useState(false);

    // État pour stocker les valeurs des champs de saisie (email et mot de passe)
    const [inputValue, setInputValue] = useState({
        login: "",
        password: "",
    });

    // Vérifier si l'utilisateur est déjà connecté au montage du composant
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
            navigate("/"); // Rediriger vers la page d'accueil si un token est trouvé
        }
    }, [navigate]);

    // Fonction pour mettre à jour les valeurs des champs de saisie
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    // Fonction de gestion de la soumission du formulaire de connexion
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login: inputValue.login,
                    password: inputValue.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Authentification échouée");
            }

            const { token } = await response.json();
            localStorage.setItem("token", token); // Stockage du token dans localStorage
            setLoggedIn(true);
            navigate("/"); // Redirection vers la page d'accueil
        } catch (error) {
            console.error("Erreur lors de la connexion : ", error);
            // Ici, vous pouvez gérer l'affichage d'erreur
        }
    };

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
                            <label htmlFor="Login"></label>
                            <Input
                                id="Login"
                                label="Login :"
                                type="text"
                                name="login"
                                className="input"
                                value={inputValue.login}
                                onChange={handleChange}
                            />

                            {/* <label htmlFor='Password'> */}
                            <label htmlFor="password"></label>
                            <Input
                                id="password"
                                label="Mot de passe :"
                                type="password"
                                name="password"
                                className="input"
                                value={inputValue.password}
                                onChange={handleChange}
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
