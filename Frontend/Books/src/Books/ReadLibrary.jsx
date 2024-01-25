import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllReadLibrary, addReadLibrary } from '../services/ReadLibrary.service';
import BiblioLogo from '../Logos/biblio1.png'; 
import FlècheLogo from '../Logos/flècheB.png'; 
import '../Css/RedLibrary.css';


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
      <div className="Retour">
        <ul>
          <li>
            <button>
              <Link to='/'>
                <img className="FlècheLogo" src={FlècheLogo} alt="logog flèche" />
                  Retour
              </Link>
            </button>
          </li>
        </ul>
      </div>
      <h1>
        <img className="BiblioLogo" src={BiblioLogo} alt="Logo Biblio" />
        Bibliothèque
        </h1>
        <div className="Container">
          {ReadLibraryList && ReadLibraryList.length > 0 ? (
            ReadLibraryList.map((book, index) => (
              <div className="Livre" key={index}>
                <div className="Titre">
                  <h3>{book.title}</h3>
                  <p>de {book.author}</p>
                </div>
                <div className="Images">
                <img 
                  src={`http://localhost:8080/images/${book.imageUrl}`} 
                  style={{ maxWidth: '50%', height: 'auto' }}
                />
                <button onClick={() => handleDeleteBook(book.id)}>🗑️</button>
                </div>
                {/* Permet une séparation entre chaque livre */}
                {/* <hr /> */} 
              </div>
            ))
          ) : (
            <p>Aucun livre à lire pour le moment.</p>
          )}
          </div>
      {/* Formulaire pour créer un nouveau livre à acheter */}
      <h2>Ajout d'un livre à mettre dans la bibliothèque</h2>
      <form>
        <label>Title:</label>
        <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        <label>Author:</label>
        <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        <label>Prix:</label>
        <input type="text" name="prix" value={newBook.prix} onChange={handleInputChange} />
        <label>Buy Link:</label>
        <input type="text" name="buyLink" value={newBook.buyLink} onChange={handleInputChange} />
        <label>Image URL:</label>
        <input type="file" onChange={handleImageChange} />
        <button type="button" onClick={handleAddReadLibrary}>Ajouter</button>
      </form>
    </div>
  );
};

export default ReadLibraryList;
