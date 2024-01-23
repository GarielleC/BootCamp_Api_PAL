import React, { useState, useEffect } from "react";
import {getAllBookToBuy, updateBookToBuyStatut, deleteBookToBuy, createBookToBuy} from '../services/bookToBuy.service';


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

  // Fonxtion pour la suppression d'un livre
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
      formData.append('image', imageFile); // Ajouter le fichier image

      // Envoyer les données (remplacer createBookToBuy par votre fonction d'API)
      await createBookToBuy(formData); 

    } catch (error) {
      console.error("Error creating book:", error);
      // Message d'erreur lors de la création du livre
      alert("Erreur lors de la création du livre à acheter. Veuillez réessayer.");
    }

    
  };
 
  return (
    <div>
      <a href='/'> ⬅️ Retour</a>
      <h1>📘 Liste de livres à acheter</h1>
      {bookToBuyList && bookToBuyList.length > 0 ? (
        bookToBuyList.map((book, index) => (
          <div key={index}>
            <p><h3>{book.title}</h3> de {book.author}</p>
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
      </form>
    </div>
  );
};

export default BookToBuyList;

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const booksToBuy = await getAllBookToBuy();
//       console.log('Books from backend:', booksToBuy);
//       setBooks(booksToBuy);
//     } catch (error) {
//       console.error("Error fetching books to buy:", error);
//     }
//   };

//   fetchData();
// }, []);  

// const handleUpdateStatus = async (bookID) => {
//   try {
//     await updateBookToBuyStatut(bookID);
//     const updatedBookToBuy = await getAllBookToBuy();
//     setBook(updatedBookToBuy);
//   } catch (error) {
//     console.error("Error updating book status:", error);
//   }
// };

// const handleDeleteBook = async (bookID) => {
//   try {
//     await deleteBookToBuy(bookID);
//     const deletedBookToBuy = await Book.destroy();
//     setBook(deletedBookToBuy);
//   } catch (error) {
//     console.error("Error deleting book:", error);
//   }
// };

// const handleCreateBook = async () => {
//   try {
//     await createBook(newBook);
//     const newBook = await Book.create();
//     setBook(newBook);
//     setNewBook({
//       title: '',
//       author: '',
//       prix: '',
//       statut:"a acheter",
//       buyLink: '',
//       imageUrl: ''
//     });
//   } catch (error) {
//     console.error("Error creating book:", error);
//   }
// };

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
// };
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getBookToBuy } from '../services/bookToBuy.service';
// import { Form } from '../Books/Form';
// // import { GetDetails } from '../services/bookToBuy.service';

// const BookToBuyDetailsComponent = () => {
//   const { ID } = useParams();
//   const [bookDetails, setBookDetails] = useState(null);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const data = await getBookToBuy(ID);
//         setBookDetails(data);
//       } catch (error) {
//         console.error('Error fetching book details:', error);
//       }
//     };

//     fetchBookDetails();
//   }, [ID]);

//   return (
//     <div>
//       {bookDetails && (
//         <>
//           <h2>📘 Détails du livre à acheter</h2>
//           <p>{bookDetails.title} de {bookDetails.author}</p>
//           <p>Image : {bookDetails.imageUrl}</p>
//           <p>Prix : {bookDetails.prix}</p>
//           <p>Lien pour l'acheter : {bookDetails.buyLink}</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookToBuyDetailsComponent;