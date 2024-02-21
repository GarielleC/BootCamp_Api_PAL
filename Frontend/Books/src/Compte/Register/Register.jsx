// Import des modules nécessaires depuis React et prop-types
import React, { useState } from "react";
import PropTypes from "prop-types";
// Import de Yup pour la validation de formulaire
import * as yup from "yup";
// Import du composant d'entrée (Input) et du style du formulaire
import Input from "../Inputs/inputs";
import "../../Css/register.css";
import { useNavigate } from "react-router-dom";

// Définition du composant fonctionnel Register avec une prop setIsRegistered
const Register = ({ setIsRegistered }) => {
    const navigate = useNavigate();
    // États pour stocker les valeurs des champs du formulaire et les erreurs de validation
    const [inputValue, setInputValue] = useState({
        genre: "",
        name: "",
        prenom: "",
        login: "",
        codePostal: "",
        date: "",
        pays: "",
        ville: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });

    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
    });

    // Fonction pour mettre à jour les valeurs des champs du formulaire
    const handleChange = (name, val) => {
        setInputValue((prevState) => ({ ...prevState, [name]: val }));
        setValidationErrors((prevState) => ({ ...prevState, [name]: "" }));
    };

    // Schéma de validation Yup pour la validation du formulaire
    const validationSchema = yup.object().shape({
        email: yup.string().email().required("Email est un champ obligatoire"),
        password: yup
            .string()
            .min(12, "Le mot de passe doit avoir au moins 12 caractères")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                "Le mot de passe doit respecter le format spécifié",
            )
            .required("Mot de passe est un champ obligatoire"),
        confirmEmail: yup.string().email().required("Email est un champ obligatoire"),
        confirmPassword: yup
            .string()
            .min(12)
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            .required("Mot de passe est un champ obligatoire"),
    });

    // Fonction de gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputValue);
        // si les 2 password sont identiques ainsi que pour l'adresse mail alors true si non message d'erreur.
        // if (passwordValue)
        try {
            // Redirection vers la page de connexion après l'enregistrement

            // Validation du formulaire avec Yup
            await validationSchema.validate(inputValue, { abortEarly: false });
            navigate("/login");
            console.log("Formulaire valide :", inputValue);
        } catch (error) {
            // Gestion des erreurs de validation
            if (error) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setValidationErrors((prevState) => ({ ...prevState, ...errors }));
            }
        }
    };

    // Rendu du composant avec le formulaire et le bouton d'enregistrement
    return (
        <div className="formulaire_container">
            <form className="formulaire_register" onSubmit={handleSubmit}>
                {/* Champs de formulaire */}
                <label htmlFor="photo">Votre photo</label>
                <Input type="file" name="photo" />
                <select
                    name="genre"
                    value={inputValue.genre}
                    onChange={(e) => handleChange("genre", e.target.value)}
                    required
                >
                    <option value="mme">Madame</option>
                    <option value="mr">Monsieur</option>
                    <option value="x">Autre</option>
                </select>

                <label htmlFor="name">NOM</label>
                <Input
                    type="text"
                    name="name"
                    value={inputValue.name}
                    size="16"
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                />

                <label htmlFor="prenom">PRÉNOM</label>
                <Input
                    type="text"
                    name="prenom"
                    value={inputValue.prenom}
                    size="16"
                    onChange={(e) => handleChange("prenom", e.target.value)}
                    required
                />
                <label htmlFor="login">PSEUDO</label>
                <Input
                    type="text"
                    name="login"
                    value={inputValue.login}
                    size="16"
                    onChange={(e) => handleChange("login", e.target.value)}
                    required
                />

                <label htmlFor="date">DATE DE NAISSANCE</label>
                <Input
                    type="date"
                    name="date"
                    value={inputValue.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                />

                <label htmlFor="codePostal">CODE POSTAL</label>
                <Input
                    type="text"
                    name="codePostal"
                    value={inputValue.codePostal}
                    onChange={(e) => handleChange("codePostal", e.target.value)}
                    required
                />

                <label htmlFor="pays">PAYS</label>
                <Input
                    type="text"
                    name="pays"
                    value={inputValue.pays}
                    onChange={(e) => handleChange("pays", e.target.value)}
                    required
                />

                <label htmlFor="ville">VILLE</label>
                <Input
                    type="text"
                    name="ville"
                    value={inputValue.ville}
                    onChange={(e) => handleChange("ville", e.target.value)}
                    required
                />

                <label htmlFor="email">EMAIL</label>
                <Input
                    type="email"
                    name="email"
                    value={inputValue.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    minLength="6"
                    maxLength="12"
                />

                <label htmlFor="confirmEmail">CONFIRMATION DE VOTRE EMAIL</label>
                <Input
                    type="email"
                    name="confirmEmail"
                    value={inputValue.confirmEmail}
                    onChange={(e) => handleChange("confirmEmail", e.target.value)}
                    required
                    minLength="6"
                    maxLength="12"
                />

                <label htmlFor="password">MOT DE PASSE</label>
                <Input
                    type="password"
                    name="password"
                    value={inputValue.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword">
                    CONFIRMATION DE VOTRE MOT DE PASSE
                </label>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={inputValue.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    required
                />

                {/* Bouton de soumission du formulaire */}
                <div className="Connexion-button-container">
                    <button className="enregistrer" type="submit">
                        Enregistrer
                    </button>
                    {/* Bouton qui permet de reset ton formulaire */}

                    {/* Bouton pour indiquer que l'utilisateur est déjà membre */}
                    <button
                        className="connexion_bouton"
                        onClick={() => setIsRegistered(true)}
                    >
                        Déjà membre ? Connectez-vous ici !
                    </button>
                </div>
            </form>
        </div>
    );
};

// Définition des types de prop pour le composant Register
Register.propTypes = {
    setIsRegistered: PropTypes.func,
};

// Export du composant Register
export default Register;

// // Import des modules nécessaires depuis React et prop-types
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// // Import de Yup pour la validation de formulaire
// import * as yup from "yup";
// // Import du composant d'entrée (Input) et du style du formulaire
// import Input from "../Inputs/inputs";
// import "../../Css/register.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Définition du composant fonctionnel Register avec une prop setIsRegistered
// const Register = ({ setIsRegistered }) => {
//     const navigate = useNavigate();
//     // États pour stocker les valeurs des champs du formulaire et les erreurs de validation
//     const [inputValue, setInputValue] = useState({
//         genre: "",
//         name: "",
//         prenom: "",
//         login: "",
//         codePostal: "",
//         date: "",
//         pays: "",
//         ville: "",
//         rue: "",
//         email: "",
//         confirmEmail: "",
//         password: "",
//         confirmPassword: "",
//         profileImagePath: null,
//     });

//     const [validationErrors, setValidationErrors] = useState({
//         email: "",
//         password: "",
//     });

//     // Fonction pour mettre à jour les valeurs des champs du formulaire
//     const handleChange = (name, val) => {
//         setInputValue((prevState) => ({ ...prevState, [name]: val }));
//         setValidationErrors((prevState) => ({ ...prevState, [name]: "" }));
//     };

//     // Schéma de validation Yup pour la validation du formulaire
//     const validationSchema = yup.object().shape({
//         email: yup.string().email().required("Email est un champ obligatoire"),
//         password: yup
//             .string()
//             .min(12, "Le mot de passe doit avoir au moins 12 caractères")
//             .matches(
//                 /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
//                 "Le mot de passe doit respecter le format spécifié",
//             )
//             .required("Mot de passe est un champ obligatoire"),
//         confirmEmail: yup.string().email().required("Email est un champ obligatoire"),
//         confirmPassword: yup
//             .string()
//             .min(12)
//             .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
//             .required("Mot de passe est un champ obligatoire"),
//     });

//     // Fonction de gestion de la soumission du formulaire
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(inputValue);
//         // si les 2 password sont identiques ainsi que pour l'adresse mail alors true si non message d'erreur.
//         // if (passwordValue)
//         try {
//             // Validation du formulaire avec Yup
//             await validationSchema.validate(inputValue, { abortEarly: false });

//             // Création d'un objet FormData pour envoyer les données du formulaire et l'image
//             const formData = new FormData();
//             Object.entries(inputValue).forEach(([key, value]) => {
//                 formData.append(key, value);
//             });
//             formData.append("profileImagePath", inputValue.profileImagePath);

//             // Envoi des données au backend
//             await axios.post("/api/register", formData);

//             // Redirection vers la page de connexion après l'enregistrement
//             navigate("/login");
//         } catch (error) {
//             // Gestion des erreurs de validation
//             if (error) {
//                 const errors = {};
//                 error.inner.forEach((err) => {
//                     errors[err.path] = err.message;
//                 });
//                 setValidationErrors((prevState) => ({ ...prevState, ...errors }));
//             }
//         }
//     };

//     // Rendu du composant avec le formulaire et le bouton d'enregistrement
//     return (
//         <div className="formulaire_container">
//             <form className="formulaire_register" onSubmit={handleSubmit}>
//                 {/* Champs de formulaire */}
//                 <label htmlFor="profileImage">Votre photo</label>
//                 <input
//                     type="file"
//                     name="profileImage"
//                     onChange={(e) => handleChange("profileImagePath", e.target.files[0])}
//                 />
//                 <select
//                     name="genre"
//                     value={inputValue.genre}
//                     onChange={(e) => handleChange("genre", e.target.value)}
//                     required
//                 >
//                     <option value="mme">Madame</option>
//                     <option value="mr">Monsieur</option>
//                     <option value="x">Autre</option>
//                 </select>
//                 <label htmlFor="name">NOM</label>
//                 <Input
//                     type="text"
//                     name="name"
//                     value={inputValue.name}
//                     size="16"
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="prenom">PRÉNOM</label>
//                 <Input
//                     type="text"
//                     name="prenom"
//                     value={inputValue.prenom}
//                     size="16"
//                     onChange={(e) => handleChange("prenom", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="login">PSEUDO</label>
//                 <Input
//                     type="text"
//                     name="login"
//                     value={inputValue.login}
//                     size="16"
//                     onChange={(e) => handleChange("login", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="date">DATE DE NAISSANCE</label>
//                 <Input
//                     type="date"
//                     name="date"
//                     value={inputValue.date}
//                     onChange={(e) => handleChange("date", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="rue">RUE ET NUMERO</label>
//                 <Input
//                     type="text"
//                     name="rue"
//                     value={inputValue.rue}
//                     onChange={(e) => handleChange("rue", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="codePostal">CODE POSTAL</label>
//                 <Input
//                     type="text"
//                     name="codePostal"
//                     value={inputValue.codePostal}
//                     onChange={(e) => handleChange("codePostal", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="pays">PAYS</label>
//                 <Input
//                     type="text"
//                     name="pays"
//                     value={inputValue.pays}
//                     onChange={(e) => handleChange("pays", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="ville">VILLE</label>
//                 <Input
//                     type="text"
//                     name="ville"
//                     value={inputValue.ville}
//                     onChange={(e) => handleChange("ville", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="email">EMAIL</label>
//                 <Input
//                     type="email"
//                     name="email"
//                     value={inputValue.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     required
//                     minLength="6"
//                     maxLength="12"
//                 />
//                 <label htmlFor="confirmEmail">CONFIRMATION DE VOTRE EMAIL</label>
//                 <Input
//                     type="email"
//                     name="confirmEmail"
//                     value={inputValue.confirmEmail}
//                     onChange={(e) => handleChange("confirmEmail", e.target.value)}
//                     required
//                     minLength="6"
//                     maxLength="12"
//                 />
//                 <label htmlFor="password">MOT DE PASSE</label>
//                 <Input
//                     type="password"
//                     name="password"
//                     value={inputValue.password}
//                     onChange={(e) => handleChange("password", e.target.value)}
//                     required
//                 />
//                 <label htmlFor="confirmPassword">
//                     CONFIRMATION DE VOTRE MOT DE PASSE
//                 </label>
//                 <Input
//                     type="password"
//                     name="confirmPassword"
//                     value={inputValue.confirmPassword}
//                     onChange={(e) => handleChange("confirmPassword", e.target.value)}
//                     required
//                 />
//                 {/* Bouton de soumission du formulaire */}
//                 <div className="Connexion-button-container">
//                     <button className="enregistrer" type="submit">
//                         Enregistrer
//                     </button>
//                     {/* Bouton qui permet de reset ton formulaire */}

//                     {/* Bouton pour indiquer que l'utilisateur est déjà membre */}
//                     <button
//                         className="connexion_bouton"
//                         onClick={() => setIsRegistered(true)}
//                     >
//                         Déjà membre ? Connectez-vous ici !
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// // Définition des types de prop pour le composant Register
// Register.propTypes = {
//     setIsRegistered: PropTypes.func,
// };

// // Export du composant Register
// export default Register;
