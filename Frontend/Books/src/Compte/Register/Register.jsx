// Import des modules nécessaires depuis React et prop-types
import React, { useState } from "react";
import PropTypes from "prop-types";
// Import de Yup pour la validation de formulaire
import * as yup from 'yup';
// Import du composant d'entrée (Input) et du style du formulaire
import Input from '../Inputs/inputs';
// import './register.scss';

// Définition du composant fonctionnel Register avec une prop setIsRegistered
const Register = ({ setIsRegistered }) => {

  // États pour stocker les valeurs des champs du formulaire et les erreurs de validation
  const [inputValue, setInputValue] = useState({
    genre: '',
    name: '',
    prenom: '',
    codePostal: '',
    date: '',
    pays: '',
    ville: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  // Fonction pour mettre à jour les valeurs des champs du formulaire
  const handleChange = (name, val) => {
    setInputValue((prevState) => ({ ...prevState, [name]: val }));
    setValidationErrors((prevState) => ({ ...prevState, [name]: '' }));
  };

  // Schéma de validation Yup pour la validation du formulaire
  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email est un champ obligatoire'),
    password: yup.string().min(12, 'Le mot de passe doit avoir au moins 12 caractères').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Le mot de passe doit respecter le format spécifié').required('Mot de passe est un champ obligatoire'),
    confirmEmail: yup.string().email().required('Email est un champ obligatoire'),
    confirmPassword: yup.string().min(12).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required('Mot de passe est un champ obligatoire'),
  });

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    // si les 2 password sont identiques ainsi que pour l'adresse mail alors true si non message d'erreur.
    // if (passwordValue)
    try {
      // Validation du formulaire avec Yup
      await validationSchema.validate(inputValue, { abortEarly: false });
      console.log('Formulaire valide :', inputValue);

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
    <div className="formulaire-container">
      <form className="Formulaire" onSubmit={handleSubmit}>
        {/* Champs de formulaire */}
        <label htmlFor="photo">Votre photo</label>
        <input type="file" name="photo" />
        <select name="genre" value={inputValue.genre} onChange={(val) => handleChange("genre", val)} required>
          <option value="mme">Madame</option>
          <option value="mr">Monsieur</option>
          <option value="xs">Autre</option>
        </select>

        <label htmlFor="name">NOM</label>
        <input type="text" name="name" value={inputValue.name} size="16" onChange={(val) => handleChange("name", val)} required />

        <label htmlFor="prenom">PRÉNOM</label>
        <input type="text" name="prenom" value={inputValue.prenom} size="16" onChange={(val) => handleChange("prenom", val)} required />

        <label htmlFor="date">DATE DE NAISSANCE</label>
        <input type="date" name="date" value={inputValue.date} onChange={(val) => handleChange("date", val)} required />

        <label htmlFor="codePostal">CODE POSTAL</label>
        <input type="text" name="codePostal" value={inputValue.codePostal} onChange={(val) => handleChange("codePostal", val)} required />

        <label htmlFor="pays">PAYS</label>
        <input type="text" name="pays" value={inputValue.pays} onChange={(val) => handleChange("pays", val)} required />

        <label htmlFor="ville">VILLE</label>
        <input type="text" name="ville" value={inputValue.ville} onChange={(val) => handleChange("ville", val)} required />

        <label htmlFor="email">EMAIL</label>
        <input type="email" name="email" value={inputValue.email} onChange={(val) => handleChange("email", val)} required minLength="6" maxLength="12" />

        <label htmlFor="confirmEmail">CONFIRMATION DE VOTRE EMAIL</label>
        <input type="email" name="confirmEmail" value={inputValue.confirmEmail} onChange={(val) => handleChange("confirmEmail", val)} required minLength="6" maxLength="12" />

        <label htmlFor="password">MOT DE PASSE</label>
        <input type="password" name="password" value={inputValue.password} onChange={(val) => handleChange("password", val)} required />

        <label htmlFor="confirmPassword">CONFIRMATION DE VOTRE MOT DE PASSE</label>
        <input type="password" name="confirmPassword" value={inputValue.confirmPassword} onChange={(val) => handleChange("confirmPassword", val)} required />

        {/* Bouton de soumission du formulaire */}
        <button type="submit">Enregistrer</button>
        {/* Bouton qui permet de reset ton formulaire */}

        {/* Bouton pour indiquer que l'utilisateur est déjà membre */}
        <button onClick={() => setIsRegistered(true)}>Déjà membre ? Connectez-vous ici !</button>
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
