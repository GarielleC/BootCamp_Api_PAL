// import axios from 'axios';


// //Récupération de tous les livres 
// // Fonction pour les livres à acheter
// export const getAllBookToBuy = async() => {
//     try{
//         const getAllBookToBuy = await axios.get('htpp://lochalhost:8080/api/bookToBuy/getAll');
//         console.log(getAllBookToBuy);
//         return getAllBookToBuy.data;
//     } catch(error){
//         console.error('Error fetching book details;', error);
//         return [];
//     }
// }

// // Fonction pour les livres à lire
// export const getAllBookToRead = async() => {
//     try{
//         const getAllBookToRead = await axios.get('htpp://lochalhost:8080/api/bookToRead/getAll');
//         console.log(getAllBookToRead);
//         return getAllBookToRead.data;
//     } catch(error){
//         console.error('Error fetching book details;', error);
//         return [];
//     }
// }

// // Fonction pour les livres lu ( Bibliothèques )
// export const getAllReadLibrary = async() => {
//     try{
//         const getAllReadLibrary = await axios.get('htpp://lochalhost:8080/api/ReadLibrary/getAll');
//         console.log(getAllReadLibrary);
//         return getAllReadLibrary.data;
//     } catch(error){
//         console.error('Error fetching book details;', error);
//         return [];
//     }
// }

// // Supression des livres sélectionner via l'ID
// // Fonction pour les livre à acheter
// export const deletedBookToBuy = async() => {
//     try{
//         const response = await axios.delete('htpp://lochalhost:8080/api/bookToBuy/delete/:bookID');
//         return response.data;
//     } catch(error){
//         throw error;
//     }
// }

// // Fonction pour les livres à lire
// export const deletedBookToRead = async() => {
//     try{
//         const response = await axios.delete('htpp://lochalhost:8080/api/bookToRead/delete/:bookID');
//         return response.data;
//     } catch(error){
//         throw error;
//     }
// }

// // Fonction pour les livres lu
// export const deletedReadLibrary = async(bookID) => {
//     try{
//         const response = await axios.delete('htpp://lochalhost:8080/api/ReadLibrary/delete/:bookID');
//         return response.data;
//     } catch(error){
//         throw error;
//     }
// }


// // Update des livres
// // Fonction update des livres à acheter
// export const updatedBookToBuy = async() => {
//     try{
//         const updatedBookToBuy = await axios.delete('htpp://lochalhost:8080/api/bookToBUy/update/:bookID');
//         console.log(updatedBookToBuy);
//         return updatedBookToBuy.data;
//     } catch(error){
//         console.error('Error fetching book details;', error);
//         return [];
//     }
// }

// // Fonction update des livres à lire

// // Fonction update des livres lu