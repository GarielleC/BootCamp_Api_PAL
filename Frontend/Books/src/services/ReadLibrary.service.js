import axios from 'axios';

export const getAllReadLibrary = async () => {
  try {
    const getAllReadLibrary = await axios.get("http://localhost:8080/api/ReadLibrary/getAll");
    console.log(getAllReadLibrary);
    return getAllReadLibrary.data;
  } catch (error) {
    console.error('Error fetching book to buy:', error);
    return [];
  }
};

// Fonction pour créer un livre à acheter avec une image
export const addReadLibrary = async (formData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/ReadLibrary/add", formData, {
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

export const getReadLibrary = async (bookID) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/ReadLibrary/get/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const deleteReadLibrary = async (bookID) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/ReadLibrary/delete/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

export const updateReadLibraryStatut = async (bookID) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/ReadLibrary/update/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error updating book status:', error);
    throw error;
  }
};