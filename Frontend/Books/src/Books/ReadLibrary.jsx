import React, { useState, useEffect } from "react";
import { getAllReadLibrary, updateReadLibraryStatut, deleteReadLibrary, addReadLibrary } from '../services/ReadLibrary.service';
import BiblioLogo from '../Logos/biblio1.png'; 


const ReadLibraryList = () => {
  const [ReadLibraryList, setReadLibraryList] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    prix: '',
    buyLink: '',
    imageUrl: ''
  });

  // État pour le fichier de l'image
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Mettre à jour l'état avec le fichier sélectionné
  };

  // Apparition de tous les livres à lire
  const getReadLibrary = async () => {
    try {
      const res = await getAllReadLibrary();
      if (res) {
        setReadLibraryList(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReadLibrary();
  }, []);

  // Fonction pour la mise à jour du livre
  const handleUpdateStatus = async (bookID) => {
    try {
      await updateReadLibraryStatut(bookID);
      // Rafraîchir la liste après la mise à jour du statut
      getReadLibrary();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  // Fonxtion pour la suppression d'un livre
  const handleDeleteReadLibrary = async (bookID) => {
    try {
      await deleteReadLibrary(bookID);
      // Rafraîchir la liste après la suppression du livre
      getBookToRead();
    } catch (error) {
      console.error("Erreur lors de la supression du livre :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  // Fonction pour créer un livre
const handleAddReadLibrary = async () => {
  try {
    // Créer un FormData pour envoyer les données du livre et l'image
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('prix', newBook.prix);
    formData.append('buyLink', newBook.buyLink);
    formData.append('imageUrl', imageFile); // Ajouter le fichier image

    // Envoyer les données
    await addReadLibrary(formData);

  } catch (error) {
    console.error("Error creating book:", error);
    // Message d'erreur lors de la création du livre
    alert("Erreur lors de la création du livre à acheter. Veuillez réessayer.");
  }
};
 
  return (
    <div>
      <a href='/'> ⬅️ Retour</a>
      <h1><img className="BiblioLogo" src={BiblioLogo} alt="Logo Biblio" />Bibliothèque</h1>
      {ReadLibraryList && ReadLibraryList.length > 0 ? (
        ReadLibraryList.map((book, index) => (
          <div key={index}>
            <div className="Titre">
              <h3>{book.title}</h3>
              <p>de {book.author}</p>
            </div>
            <img 
              src={`http://localhost:8080/images/${book.imageUrl}`} 
              style={{ maxWidth: '50%', height: 'auto' }}
            />
            <hr />
          </div>
        ))
      ) : (
        <p>Aucun livre à lire pour le moment.</p>
      )}
      {/* Formulaire pour créer un nouveau livre à acheter */}
      <h2>Ajout d'un livre à mettre dans la bibliothèque</h2>
      <form>
        <label><strong>Title :</strong></label>
        <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        <label><strong>Auteur(e)(s) :</strong></label>
        <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        <label><strong>Prix :</strong></label>
        <input type="text" name="prix" value={newBook.prix} onChange={handleInputChange} />
        <label><strong>Lien pour l'acheter :</strong></label>
        <input type="text" name="buyLink" value={newBook.buyLink} onChange={handleInputChange} />
        <label><strong>Image :</strong></label>
        <input type="file" onChange={handleImageChange} />
        <button type="button" onClick={handleAddReadLibrary}>➕ Ajouter</button>
      </form>
    </div>
  );
};

export default ReadLibraryList;



// import React from "react";
// // import { Link } from 'react-router-dom'
// // import Form from "./Form";
// // import Pal from "./Pal";
// // import { nanoid } from 'nanoid';

// const ReadLibrary = () => {
//     return (
//       <div>
//         <h2>📚 Bibliothèque</h2>
//         <p>coucou</p>
//       </div>
//     );
//   };
  
//   export default ReadLibrary;