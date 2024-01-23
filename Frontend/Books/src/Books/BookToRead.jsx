import React, { useState, useEffect } from "react";
import { getAllBookToRead, updateBookToReadStatut, deleteBookToRead, addBookToRead } from '../services/bookToRead.service';


const BookToReadList = () => {
  const [bookToReadList, setBookToReadList] = useState([]);
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
  const getBookToRead = async () => {
    try {
      const res = await getAllBookToRead();
      if (res) {
        setBookToReadList(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookToRead();
  }, []);

  // Fonction pour la mise à jour du livre
  const handleUpdateStatus = async (bookID) => {
    try {
      await updateBookToReadStatut(bookID);
      // Rafraîchir la liste après la mise à jour du statut
      getBookToRead();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  // Fonxtion pour la suppression d'un livre
  const handleDeleteBook = async (bookID) => {
    try {
      await deleteBookToRead(bookID);
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
const handleAddBook = async () => {
  try {
    // Créer un FormData pour envoyer les données du livre et l'image
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('prix', newBook.prix);
    formData.append('buyLink', newBook.buyLink);
    formData.append('imageUrl', imageFile); // Ajouter le fichier image

    // Envoyer les données
    await addBookToRead(formData);

  } catch (error) {
    console.error("Error creating book:", error);
    // Message d'erreur lors de la création du livre
    alert("Erreur lors de la création du livre à acheter. Veuillez réessayer.");
  }
};
 
  return (
    <div>
      <a href='/'> ⬅️ Retour</a>
      <h1>📖 Liste de livres à lire</h1>
      {bookToReadList && bookToReadList.length > 0 ? (
        bookToReadList.map((book, index) => (
          <div key={index}>
            <div className="Titre">
              <h3>{book.title}</h3>
              <p>de {book.author}</p>
            </div>
            <img 
              src={`http://localhost:8080/images/${book.imageUrl}`} 
              style={{ maxWidth: '50%', height: 'auto' }}
            />
            <label>
              Lu
              <input type="checkbox" onChange={() => handleUpdateStatus(book.id)}/>
            </label>
            <button onClick={() => handleDeleteBook(book.id)}>🗑️</button>
            <hr />
          </div>
        ))
      ) : (
        <p>Aucun livre à lire pour le moment.</p>
      )}
      {/* Formulaire pour créer un nouveau livre à acheter */}
      <h2>Créer un nouveau livre à lire</h2>
      <form>
        <label><strong>Title :</strong></label>
        <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        <label><strong>Author :</strong></label>
        <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        <label><strong>Prix :</strong></label>
        <input type="text" name="prix" value={newBook.prix} onChange={handleInputChange} />
        <label><strong>Lien pour acheter le livre :</strong></label>
        <input type="text" name="buyLink" value={newBook.buyLink} onChange={handleInputChange} />
        <label><strong>Image :</strong></label>
        <input type="file" onChange={handleImageChange} />
        <button type="button" onClick={handleAddBook}>➕ Ajouter</button>
      </form>
    </div>
  );
};

export default BookToReadList;