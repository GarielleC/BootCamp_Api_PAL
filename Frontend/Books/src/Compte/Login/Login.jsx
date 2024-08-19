import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Inputs/inputs';
import Register from '../Register/Register';
import { useAuth } from '../../services/AuthContext';
import AuthService from '../../services/AuthService';

const Login = () => {
    const [inputValue, setInputValue] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Envoie de la requête de connexion
            console.log("Envoi de la requête de connexion avec les données :", inputValue);
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email: inputValue.email,
                password: inputValue.password
            });
            
            console.log("Réponse de la connexion :", response);

            if (response.status === 200) {
                const { token, userId } = response.data;
                console.log("Token reçu du backend :", token);
                console.log("ID utilisateur reçu :", userId);

                // Stockage du token et de l'ID utilisateur
                AuthService.saveToken(token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("token", token);

                // Mise à jour de l'état d'authentification
                setIsAuthenticated(true);

                // Récupération du profil utilisateur après la connexion
                try {
                    const userProfile = await AuthService.fetchUserProfile();
                    console.log("Profil utilisateur récupéré après connexion :", userProfile);
                    navigate("/");
                } catch (fetchError) {
                    console.error("Erreur lors de la récupération du profil utilisateur après connexion :", fetchError);
                    setErrorMessage("Erreur lors de la récupération du profil utilisateur.");
                }
            } else {
                throw new Error("Authentification échouée");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setErrorMessage(error.response?.data?.message || "Erreur de connexion");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <>
            {isAuthenticated ? (
                <Register />
            ) : (
                <form className="log" onSubmit={handleLogin}>
                    <div className="logout">
                        <label htmlFor="email"></label>
                        <Input
                            id="email"
                            label="Email :"
                            type="email"
                            name="email"
                            className="input"
                            value={inputValue.email}
                            onChange={handleChange}
                        />
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



// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Input from '../Inputs/inputs';
// import Register from '../Register/Register';
// import { useAuth } from '../../services/AuthContext';
// import AuthService from '../../services/AuthService'; 

// const Login = () => {
//     const [inputValue, setInputValue] = useState({ email: '', password: '' });
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();
//     const { isAuthenticated, setIsAuthenticated } = useAuth();

//     const handleLogin = async (e) => {
//         e.preventDefault();
        

//         try {
//             console.log("Envoi de la requête de connexion avec les données :", inputValue);
//             const response = await axios.post("http://localhost:8080/api/auth/login", {
//                 email,
//                 password
//             });
    
//             if (response.status === 200) {
//                 const { token, userId } = response.data;
//                 AuthService.saveToken(token);
//                 localStorage.setItem("userId", userId);
//                 setIsAuthenticated(true);

//                 // Récupération du profil utilisateur après la connexion
//                 try {
//                     const userProfile = await AuthService.fetchUserProfile();
//                     console.log("Profil utilisateur récupéré après connexion :", userProfile);
//                     navigate("/");
//                 } catch (fetchError) {
//                     console.error("Erreur lors de la récupération du profil utilisateur après connexion :", fetchError);
//                     setErrorMessage("Erreur lors de la récupération du profil utilisateur.");
//                 }
//             } else {
//                 throw new Error("Authentification échouée");
//             }
//         } catch (error) {
//             console.error("Erreur lors de la connexion :", error);
//             setErrorMessage(error.response?.data?.message || "Erreur de connexion");
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setInputValue((prevState) => ({ ...prevState, [name]: value }));
//     };

//     return (
//         <>
//             {isAuthenticated ? (
//                 <Register />
//             ) : (
//                 <form className="log" onSubmit={handleLogin}>
//                     <div className="logout">
//                         <label htmlFor="email"></label>
//                         <Input
//                             id="email"
//                             label="Email :"
//                             type="email"
//                             name="email"
//                             className="input"
//                             value={inputValue.email}
//                             onChange={handleChange}
//                         />
//                         <label htmlFor="password"></label>
//                         <Input
//                             id="password"
//                             label="Mot de passe :"
//                             type="password"
//                             name="password"
//                             className="input"
//                             value={inputValue.password}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     {errorMessage && <div className="error-message">{errorMessage}</div>}
//                     <div className="log_register">
//                         <button className="connexion" type="submit">
//                             Connexion
//                         </button>
//                         <button
//                             className="register"
//                             type="button"
//                             onClick={() => setIsAuthenticated(false)}
//                         >
//                             Pas encore membre ? Inscrivez-vous ici !
//                         </button>
//                     </div>
//                 </form>
//             )}
//         </>
//     );
// };

// export default Login;








// // const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //         const response = await fetch("http://localhost:8080/api/auth/login", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({
// //                 email: inputValue.email, 
// //                 password: inputValue.password,
// //             }),
// //         });

// //         if (!response.ok) {
// //             throw new Error("Authentification échouée");
// //         }

// //         const { token } = await response.json();
// //         localStorage.setItem("token", token); // Stockage du token dans localStorage
// //         setLoggedIn(true);
// //         navigate("/"); // Redirection vers la page d'accueil
// //     } catch (error) {
// //         console.error("Erreur lors de la connexion : ", error);
       
// //     }

// //     // Rendu conditionnel basé sur l'état isRegistered
// //     return (
// //         <>
// //             {isRegistered ? (
// //                 // Si l'utilisateur n'est pas encore enregistré, afficher le composant d'inscription
// //                 <Register setIsRegistered={setIsRegistered} />
// //             ) : (
// //                 // Sinon, afficher le formulaire de connexion
// //                 <>
// //                     <form className="log" onSubmit={handleLogin}>
// //                         <div className="logout">
// //                             <label htmlFor="Email"></label>
// //                             <Input
// //                                 id="Email"
// //                                 label="Login :"
// //                                 type="text"
// //                                 name="email"
// //                                 className="input"
// //                                 value={inputValue.email}
// //                                 onChange={handleChange}
// //                             />

// //                             {/* <label htmlFor='Password'> */}
// //                             <label htmlFor="password"></label>
// //                             <Input
// //                                 id="password"
// //                                 label="Mot de passe :"
// //                                 type="password"
// //                                 name="password"
// //                                 className="input"
// //                                 value={inputValue.password}
// //                                 onChange={handleChange}
// //                             />
// //                         </div>
// //                         <div className="log_register">
// //                             <button className="connexion" type="submit">
// //                                 Connexion
// //                             </button>
// //                             <button
// //                                 className="register"
// //                                 onClick={() => setIsRegistered(true)}
// //                             >
// //                                 Pas encore membre ? Inscrivez-vous ici !
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </>
// //             )}
// //         </>
// //     );
// // };

// // // Définition des types de propriétés attendues par le composant
// // Login.propTypes = {
// //     isRegistered: PropTypes.bool,
// //     setIsRegistered: PropTypes.func,
// // };

// // export default Login;




// // import React, { useState, useEffect } from "react";
// // import PropTypes from "prop-types";
// // import { useNavigate } from "react-router-dom";
// // import Input from "../Inputs/inputs";
// // import Register from "../Register/Register";
// // import "../../Css/login.css";

// // // Définition du composant de connexion (Login)
// // const Login = (props) => {
// //     // Utilisation du hook useNavigate pour la navigation dans React Router
// //     const navigate = useNavigate();

// //     // État pour suivre si l'utilisateur est déjà enregistré ou non
// //     const [isRegistered, setIsRegistered] = useState(false);
// //     // État pour suivre si l'utilisateur est connecté
// //     const [isLoggedIn, setLoggedIn] = useState(false);

// //     // État pour stocker les valeurs des champs de saisie (email et mot de passe)
// //     const [inputValue, setInputValue] = useState({
// //         login: "",
// //         password: "",
// //     });

// //     // Vérifier si l'utilisateur est déjà connecté au montage du composant
// //     useEffect(() => {
// //         const token = localStorage.getItem("token");
// //         if (token) {
// //             setLoggedIn(true);
// //             navigate("/"); // Rediriger vers la page d'accueil si un token est trouvé
// //         }
// //     }, [navigate]);

// //     // Fonction pour mettre à jour les valeurs des champs de saisie
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setInputValue({ ...inputValue, [name]: value });
// //     };

// //     // Fonction de gestion de la soumission du formulaire de connexion
// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await fetch("http://localhost:8080/api/auth/login", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                     login: inputValue.login,
// //                     password: inputValue.password,
// //                 }),
// //             });

// //             if (!response.ok) {
// //                 throw new Error("Authentification échouée");
// //             }

// //             const { token } = await response.json();
// //             localStorage.setItem("token", token); // Stockage du token dans localStorage
// //             setLoggedIn(true);
// //             navigate("/"); // Redirection vers la page d'accueil
// //         } catch (error) {
// //             console.error("Erreur lors de la connexion : ", error);
// //             // Ici, vous pouvez gérer l'affichage d'erreur
// //         }
// //     };

// //     // Rendu conditionnel basé sur l'état isRegistered
// //     return (
// //         <>
// //             {isRegistered ? (
// //                 // Si l'utilisateur n'est pas encore enregistré, afficher le composant d'inscription
// //                 <Register setIsRegistered={setIsRegistered} />
// //             ) : (
// //                 // Sinon, afficher le formulaire de connexion
// //                 <>
// //                     <form className="log" onSubmit={handleLogin}>
// //                         <div className="logout">
// //                             <label htmlFor="Email"></label>
// //                             <Input
// //                                 id="Email"
// //                                 label="Login :"
// //                                 type="text"
// //                                 name="email"
// //                                 className="input"
// //                                 value={inputValue.email}
// //                                 onChange={handleChange}
// //                             />

// //                             {/* <label htmlFor='Password'> */}
// //                             <label htmlFor="password"></label>
// //                             <Input
// //                                 id="password"
// //                                 label="Mot de passe :"
// //                                 type="password"
// //                                 name="password"
// //                                 className="input"
// //                                 value={inputValue.password}
// //                                 onChange={handleChange}
// //                             />
// //                         </div>
// //                         <div className="log_register">
// //                             <button className="connexion" type="submit">
// //                                 Connexion
// //                             </button>
// //                             <button
// //                                 className="register"
// //                                 onClick={() => setIsRegistered(true)}
// //                             >
// //                                 Pas encore membre ? Inscrivez-vous ici !
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </>
// //             )}
// //         </>
// //     );
// // };

// // // Définition des types de propriétés attendues par le composant
// // Login.propTypes = {
// //     isRegistered: PropTypes.bool,
// //     setIsRegistered: PropTypes.func,
// // };

// // export default Login;
