import React, { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

const Form = (props) => {
    const [values, setValues] = useState({
        id: '',
        title: '',
        author: '',
        status: '', 
        prix: '', 
        buyLink: '', 
        imageUrl: '', 
        type: 'toRead' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
            id: nanoid()
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateList(values);
        setValues({
            id: '',
            title: '',
            author: '',
            statut: 'à lire',
            prix: '',
            buyLink: '',
            imageUrl: '',
        });
    }

    return (
        <section>
            <h2>Ajouter un livre à lire</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titre du livre :</label>
                <input 
                    type="text" 
                    name="title"
                    value={values.title}
                    onChange={handleChange} />
    
                <label htmlFor="author">Auteur :</label>
                <input 
                    type="text"
                    name="author"
                    value={values.author}
                    onChange={handleChange} />

                <label htmlFor="status">Statut :</label>
                <input 
                    type="text"
                    name="status"
                    value={values.statut}
                    onChange={handleChange} />

                <label htmlFor="prix">Prix :</label>
                <input 
                    type="text"
                    name="prix"
                    value={values.prix}
                    onChange={handleChange} />

                <label htmlFor="buyLink">Lien d'achat :</label>
                <input 
                    type="text"
                    name="buyLink"
                    value={values.buyLink}
                    onChange={handleChange} />

                <label htmlFor="imageUrl">URL de l'image :</label>
                <input 
                    type="text"
                    name="imageUrl"
                    value={values.imageUrl}
                    onChange={handleChange} />

                <button type="submit">💸 A acheter</button>
            </form>
        </section>
    );
};

Form.propTypes = {
    updateList: PropTypes.func,
}

export default Form;

