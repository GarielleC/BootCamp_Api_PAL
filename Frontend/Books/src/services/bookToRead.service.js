import axios from 'axios';

export const getAllBookToRead = async () => {
  try {
    const getAllBookToRead = await axios.get("http://localhost:8080/api/bookToRead/getAll");
    console.log(getAllBookToRead);
    return getAllBookToRead.data;
  } catch (error) {
    console.error('Error fetching book to buy:', error);
    return [];
  }
};

// Fonction pour créer un livre à acheter avec une image
export const addBookToRead = async (formData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/bookToRead/add", formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Indiquer que le contenu est de type "multipart/form-data" pour gérer les fichiers
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    return [];
  }
};

export const getBookToRead = async (bookID) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/bookToRead/get/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const deleteBookToRead = async (bookID) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/bookToBuy/delete/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

export const updateBookToReadStatut = async (bookID) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/bookToRead/update/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error updating book status:', error);
    throw error;
  }
};