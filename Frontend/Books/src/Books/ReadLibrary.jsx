import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllReadLibrary, addReadLibrary, deleteReadLibrary} from '../services/ReadLibrary.service';
import '../Css/Normalize.css';
import BiblioLogo from '../Logos/biblio1.png'; 
import FlècheLogo from '../Logos/flècheB.png'; 
// import Poubelle from '../Logos/Poubelle.png';
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

  // Fonction pour réinitialiser le formulaire
const resetForm = () => {
  setNewBook({
    title: '',
    author: '',
    prix: '',
    buyLink: '',
    imageUrl: ''
  });
  setImageFile(null); // Réinitialiser également le fichier image
};

  // Apparition de tous les livres à lire
  const getReadLibrary = async () => {
    try {
      const res = await getAllReadLibrary();
      if (res) {
        setReadLibraryList(res);
      }

      // Trier les livres par ordre alphabétique ici
      const sortedBooks = [...res];
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      setReadLibraryList(sortedBooks);

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

  // // Fonxtion pour la suppression d'un livre
  // const handleDeleteReadLibrary = async (bookID) => {
  //   try {
  //     await deleteReadLibrary(bookID);
  //     // Rafraîchir la liste après la suppression du livre
  //     getReadLibrary();
  //   } catch (error) {
  //     console.error("Erreur lors de la supression du livre :", error);
  //   }
  // };

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

    // Rafraîchir la liste après l'ajout du livre
    getReadLibrary();

     // Réinitialiser le formulaire
     resetForm();

  } catch (error) {
    console.error("Error creating book:", error);
    // Message d'erreur lors de la création du livre
    alert("Erreur lors de la création du livre à acheter. Veuillez réessayer.");
  }
};
// Fonction pour calculer le total des livres à lire
const calculateTotalBooks = () => {
  return ReadLibraryList.length;
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

        {/* Affiche le total des livres à lire */}
        <h2>Total des livres lus : {calculateTotalBooks()}</h2>

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
                />
                {/* <button onClick={() => handleDeleteBook(book.id)}>🗑️</button> */}
                </div>
                {/* <button className="DeleteButton" onClick={() => handleDeleteReadLibrary(book.id)}>
                  <img className="Poubelle" src={Poubelle} alt="Logo Poubelle" />
              </button> */}
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
      <form className="Formulaire">
        <label><strong>Titre :</strong></label>
        <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        <label><strong>Auteur(e)(s) :</strong></label>
        <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        <label><strong>Prix :</strong></label>
        <input type="text" name="prix" value={newBook.prix} onChange={handleInputChange} />
        <label><strong>Lien pour acheter le livre :</strong></label>
        <input type="text" name="buyLink" value={newBook.buyLink} onChange={handleInputChange} />
        <label><strong>Image :</strong></label>
        <input type="file" onChange={handleImageChange} />
        <button type="button" onClick={handleAddReadLibrary}>Ajouter</button>
      </form>
    </div>
  );
};

export default ReadLibraryList;
