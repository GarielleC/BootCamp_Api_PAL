import { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

const Form = (props) => {
    // On stock les valeurs du formulaire
    const [values, setValues] = useState({
        id: '',
        title: '',
        author: '',
        completed: false,
        type: 'toRead' 
    });

    // Fonction pour mettre à jour les valeurs lors de la saisie
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
            id: nanoid()  
        });
    }

    // Fonction pour soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Appel de la fonction de mise à jour de la liste
        props.updateList(values);

        // Réinitialisation des valeurs du formulaire après la soumission
        setValues({
            id: '',
            title: '',
            author: '',
            completed: false,
            type: 'toRead'
        });
    }

    return (
        <section>
        {/* Formulaire */}
        <h2>Ajouter un livre à lire</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Titre du livre :</label>
            <input 
                type="text" 
                name="title"
                value={values.title}
                onChange={handleChange} />
    
            <label htmlFor="author">Auteur: </label>
            <input 
                type="text"
                name="author"
                value={values.author}
                onChange={handleChange} />
                 <button type="submit">💸 A acheter</button>
        </form>
    </section>
    
    )
};


Form.propTypes = {
    updateList: PropTypes.func,
}

export default Form;
