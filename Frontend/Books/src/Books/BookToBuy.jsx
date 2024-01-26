import React, { useState, useEffect } from "react";
import {getAllBookToBuy, updateBookToBuyStatut, deleteBookToBuy, createBookToBuy} from '../services/bookToBuy.service';
import LivreFermeLogo from '../Logos/livreFerme1.png';


const BookToBuyList = () => {
  const [bookToBuyList, setBookToBuyList] = useState([]);
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
  const getBookToBuy = async () => {
    try {
      const res = await getAllBookToBuy();
      if (res) {
        setBookToBuyList(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookToBuy();
  }, []);

  // Fonction pour la mise à jour du livre
  const handleUpdateStatus = async (bookID) => {
    try {
      await updateBookToBuyStatut(bookID);
      // Rafraîchir la liste après la mise à jour du statut
      getBookToBuy();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  // Fonction pour la suppression d'un livre
  const handleDeleteBook = async (bookID) => {
    try {
      await deleteBookToBuy(bookID);
      // Rafraîchir la liste après la suppression du livre
      getBookToBuy();
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
  const handleCreateBook = async () => {
    try {
      // Créer un FormData pour envoyer les données du livre et l'image
      const formData = new FormData();
      formData.append('title', newBook.title);
      formData.append('author', newBook.author);
      formData.append('prix', newBook.prix);
      formData.append('buyLink', newBook.buyLink);
      formData.append('imageUrl', imageFile); // Ajouter le fichier image

      // Envoyer les données (remplacer createBookToBuy par votre fonction d'API)
      await createBookToBuy(formData); 

       // Rafraîchir la liste après l'ajout du livre
     getBookToBuy();

      // Réinitialiser le formulaire
      resetForm();

    } catch (error) {
      console.error("Error creating book:", error);
      // Message d'erreur lors de la création du livre
      alert("Erreur lors de la création du livre à acheter. Veuillez réessayer.");
    }

    
  };
 
  return (
    <div>
      <a href='/'> ⬅️ Retour</a>
      <h1><img className="LivreFermeLogo" src={LivreFermeLogo} alt="Logo Livre Fermé" />Liste de livres à acheter</h1>
      {bookToBuyList && bookToBuyList.length > 0 ? (
        bookToBuyList.map((book, index) => (
          <div key={index}>
            <div className="Titre">
              <h3>{book.title}</h3>
              <p>de {book.author}</p>
            </div>
            <img 
              src={`http://localhost:8080/images/${book.imageUrl}`} 
              style={{ maxWidth: '50%', height: 'auto' }}
            />
            <strong><p>Prix : {book.prix} €</p></strong>
            <p><strong>Lien pour l'acheter :</strong><a href={book.buyLink} target="_blank" rel="noopener noreferrer">{book.buyLink}</a></p>
            <button onClick={() => handleUpdateStatus(book.id)}>💸 Acheter</button>
            <button onClick={() => handleDeleteBook(book.id)}>🗑️</button>
            <hr />
          </div>
        ))
      ) : (
        <p>Aucun livre à acheter pour le moment.</p>
      )}
      {/* Formulaire pour créer un nouveau livre à acheter */}
      <h2>Créer un nouveau livre à acheter</h2>
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
        <button type="button" onClick={handleCreateBook}>Ajouter</button>
        <button type="reset" onClick={resetForm}>Réinitialiser</button>
      </form>
    </div>
  );
};

export default BookToBuyList;
