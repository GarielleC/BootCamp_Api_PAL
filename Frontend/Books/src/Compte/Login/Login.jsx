import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Inputs/inputs';
import Register from '../Register/Register';
import { useAuth } from '../../services/AuthContext';

const Login = () => {
    const [inputValue, setInputValue] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    // Fonction pour récupérer le profil utilisateur
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token récupéré pour l'appel API :", token);

            if (!token) throw new Error("Token non trouvé");

            const userResponse = await fetch("http://localhost:8080/api/user/profile", {
                method: "GET", // Assurez-vous que la méthode est correcte
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.json();
                throw new Error(errorData.message || "Erreur lors de la récupération du profil utilisateur");
            }

            const userData = await userResponse.json();
            console.log("Profil utilisateur récupéré :", userData);
            // Vous pouvez également mettre à jour l'état ou faire autre chose avec les données utilisateur ici

        } catch (error) {
            console.error("Erreur lors de la récupération du profil utilisateur :", error.message);
            // Optionnel : vous pouvez également gérer l'état d'authentification ici
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: inputValue.email,
                    password: inputValue.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Authentification échouée");
                return;
            }

            const { token, userId } = await response.json();
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            setIsAuthenticated(true);  // Mise à jour de l'état d'authentification
            setErrorMessage('');
            navigate("/");

            // Appel pour récupérer le profil utilisateur après la connexion
            await fetchUserProfile();
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            {isAuthenticated ? (
                <Register />
            ) : (
                <form className="log" onSubmit={handleLogin}>
                    <div className="logout">
                        <label htmlFor="email">Email :</label>
                        <Input
                            id="email"
                            label="Email :"
                            type="email"
                            name="email"
                            className="input"
                            value={inputValue.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Mot de passe :</label>
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
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="log_register">
                        <button className="connexion" type="submit">
                            Connexion
                        </button>
                        <button
                            className="register"
                            type="button"
                            onClick={() => setIsAuthenticated(false)}
                        >
                            Pas encore membre ? Inscrivez-vous ici !
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default Login;






// const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch("http://localhost:8080/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: inputValue.email, 
//                 password: inputValue.password,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Authentification échouée");
//         }

//         const { token } = await response.json();
//         localStorage.setItem("token", token); // Stockage du token dans localStorage
//         setLoggedIn(true);
//         navigate("/"); // Redirection vers la page d'accueil
//     } catch (error) {
//         console.error("Erreur lors de la connexion : ", error);
       
//     }

//     // Rendu conditionnel basé sur l'état isRegistered
//     return (
//         <>
//             {isRegistered ? (
//                 // Si l'utilisateur n'est pas encore enregistré, afficher le composant d'inscription
//                 <Register setIsRegistered={setIsRegistered} />
//             ) : (
//                 // Sinon, afficher le formulaire de connexion
//                 <>
//                     <form className="log" onSubmit={handleLogin}>
//                         <div className="logout">
//                             <label htmlFor="Email"></label>
//                             <Input
//                                 id="Email"
//                                 label="Login :"
//                                 type="text"
//                                 name="email"
//                                 className="input"
//                                 value={inputValue.email}
//                                 onChange={handleChange}
//                             />

//                             {/* <label htmlFor='Password'> */}
//                             <label htmlFor="password"></label>
//                             <Input
//                                 id="password"
//                                 label="Mot de passe :"
//                                 type="password"
//                                 name="password"
//                                 className="input"
//                                 value={inputValue.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="log_register">
//                             <button className="connexion" type="submit">
//                                 Connexion
//                             </button>
//                             <button
//                                 className="register"
//                                 onClick={() => setIsRegistered(true)}
//                             >
//                                 Pas encore membre ? Inscrivez-vous ici !
//                             </button>
//                         </div>
//                     </form>
//                 </>
//             )}
//         </>
//     );
// };

// // Définition des types de propriétés attendues par le composant
// Login.propTypes = {
//     isRegistered: PropTypes.bool,
//     setIsRegistered: PropTypes.func,
// };

// export default Login;




// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import Input from "../Inputs/inputs";
// import Register from "../Register/Register";
// import "../../Css/login.css";

// // Définition du composant de connexion (Login)
// const Login = (props) => {
//     // Utilisation du hook useNavigate pour la navigation dans React Router
//     const navigate = useNavigate();

//     // État pour suivre si l'utilisateur est déjà enregistré ou non
//     const [isRegistered, setIsRegistered] = useState(false);
//     // État pour suivre si l'utilisateur est connecté
//     const [isLoggedIn, setLoggedIn] = useState(false);

//     // État pour stocker les valeurs des champs de saisie (email et mot de passe)
//     const [inputValue, setInputValue] = useState({
//         login: "",
//         password: "",
//     });

//     // Vérifier si l'utilisateur est déjà connecté au montage du composant
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             setLoggedIn(true);
//             navigate("/"); // Rediriger vers la page d'accueil si un token est trouvé
//         }
//     }, [navigate]);

//     // Fonction pour mettre à jour les valeurs des champs de saisie
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInputValue({ ...inputValue, [name]: value });
//     };

//     // Fonction de gestion de la soumission du formulaire de connexion
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:8080/api/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     login: inputValue.login,
//                     password: inputValue.password,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error("Authentification échouée");
//             }

//             const { token } = await response.json();
//             localStorage.setItem("token", token); // Stockage du token dans localStorage
//             setLoggedIn(true);
//             navigate("/"); // Redirection vers la page d'accueil
//         } catch (error) {
//             console.error("Erreur lors de la connexion : ", error);
//             // Ici, vous pouvez gérer l'affichage d'erreur
//         }
//     };

//     // Rendu conditionnel basé sur l'état isRegistered
//     return (
//         <>
//             {isRegistered ? (
//                 // Si l'utilisateur n'est pas encore enregistré, afficher le composant d'inscription
//                 <Register setIsRegistered={setIsRegistered} />
//             ) : (
//                 // Sinon, afficher le formulaire de connexion
//                 <>
//                     <form className="log" onSubmit={handleLogin}>
//                         <div className="logout">
//                             <label htmlFor="Email"></label>
//                             <Input
//                                 id="Email"
//                                 label="Login :"
//                                 type="text"
//                                 name="email"
//                                 className="input"
//                                 value={inputValue.email}
//                                 onChange={handleChange}
//                             />

//                             {/* <label htmlFor='Password'> */}
//                             <label htmlFor="password"></label>
//                             <Input
//                                 id="password"
//                                 label="Mot de passe :"
//                                 type="password"
//                                 name="password"
//                                 className="input"
//                                 value={inputValue.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="log_register">
//                             <button className="connexion" type="submit">
//                                 Connexion
//                             </button>
//                             <button
//                                 className="register"
//                                 onClick={() => setIsRegistered(true)}
//                             >
//                                 Pas encore membre ? Inscrivez-vous ici !
//                             </button>
//                         </div>
//                     </form>
//                 </>
//             )}
//         </>
//     );
// };

// // Définition des types de propriétés attendues par le composant
// Login.propTypes = {
//     isRegistered: PropTypes.bool,
//     setIsRegistered: PropTypes.func,
// };

// export default Login;
