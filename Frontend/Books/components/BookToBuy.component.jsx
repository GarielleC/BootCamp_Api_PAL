// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllBookToBuy, getBookToBuy, createBookToBuy, updateBookToBuy, deleteBookToBuy } from '../services/bookToBuy.service';

// const BookToBuyComponent = () => {
//   const [bookToBuy, setBookToBuy] = useState([]);

//   useEffect(() => {
//     const fetchBookToBuy = async () => {
//       try {
//         const data = await getAllBookToBuy();
//         setBookToBuy(data);
//       } catch (error) {
//         console.error('Error fetching books to buy:', error);
//       }
//     };

//     fetchBookToBuy();
//   }, []);

//   const handleUpdateBookStatut = async (bookID) => {
//     try {
//       await updateBookToBuyStatut(bookID);
//       setBookToBuy((prevBooks) =>
//         prevBooks.map((book) =>
//           book.id === bookID ? { ...book, statut: 'a lire' } : book
//         )
//       );
//     } catch (error) {
//       console.error('Error updating book status:', error);
//     }
//   };

//   const handleDeleteBook = async (bookID) => {
//     try {
//       await deleteBookToBuy(bookID);
//       setBookToBuy((prevBooks) => prevBooks.filter((book) => book.ID !== bookID));
//     } catch (error) {
//       console.error('Error deleting book:', error);
//     }
//   }
//   return (
//     <div>
//          {bookToBuy.map((bookID) => (
//             <div key={bookID.id}>
//               <Link to={`/bookToBuy/${bookID}`}>
//                 <h3>{bookID.title}</h3>
//               </Link>
//               <p>Auteur(e)(s): {bookID.author}</p>
//               <p>Statut: {bookID.statut}</p>
//               <button onClick={() => handleUpdateBookStatut(bookID.id)}>Marquer comme à lire</button>
//               <button onClick={() => handleDeleteBook(bookID.id)}>Supprimer le livre</button>
//             </div>
//           ))}
//         </div>
//   );
// };

// export default BookToBuy;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllBookToBuy, updateBookToBuyStatut, deleteBookToBuy } from '../services/bookToBuy.service';

// const BookToBuyComponent = () => {
//   const [bookToBuyList, setBookToBuyList] = useState([]);

//   useEffect(() => {
//     const fetchBookToBuyList = async () => {
//       try {
//         const data = await getAllBookToBuy();
//         setBookToBuyList(data);
//       } catch (error) {
//         console.error('Error fetching books to buy:', error);
//       }
//     };

//     fetchBookToBuyList();
//   }, []);

//   const handleUpdateBookStatut = async (bookID) => {
//     try {
//       await updateBookToBuyStatut(bookID);
//       setBookToBuyList((prevBooks) =>
//         prevBooks.map((book) =>
//           book.id === bookID ? { ...book, statut: 'a lire' } : book
//         )
//       );
//     } catch (error) {
//       console.error('Error updating book status:', error);
//     }
//   };

//   const handleDeleteBook = async (bookID) => {
//     try {
//       await deleteBookToBuy(bookID);
//       setBookToBuyList((prevBooks) => prevBooks.filter((book) => book.ID !== bookID));
//     } catch (error) {
//       console.error('Error deleting book:', error);
//     }
//   };

//   return (
//     <div>
//       {bookToBuyList.map((book) => (
//         <div key={book.ID}>
//           <Link to={`/bookToBuy/${book.ID}`}>
//             <h3>{book.title}</h3>
//           </Link>
//           <p>Auteur(e)(s): {Book.author}</p>
//           <p>Statut: {Book.statut}</p>
//           <button onClick={() => handleUpdateBookStatut(Book.ID)}>Marquer comme à lire</button>
//           <button onClick={() => handleDeleteBook(Book.ID)}>Supprimer le livre</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookToBuyComponent;