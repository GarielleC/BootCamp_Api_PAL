import axios from 'axios';
import authService from './authService';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/bookToBuy/',
});

// Ajouter le token JWT aux en-têtes des requêtes
instance.interceptors.request.use(config => {
  const token = authService.getToken();
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
 
export const getAllBookToBuy = async () => {
  try {
    const getAllBookToBuy = await instance.get("http://localhost:8080/api/bookToBuy/getAll");
    console.log(getAllBookToBuy);
    return getAllBookToBuy.data;
  } catch (error) {
    console.error('Error fetching book to buy:', error);
    return [];
  }
};

// Fonction pour créer un livre à acheter avec une image
export const createBookToBuy = async (formData) => {
  try {
    const response = await instance.post("http://localhost:8080/api/bookToBuy/create", formData, {
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

export const getBookToBuy = async (bookID) => {
  try {
    const response = await instance.get(`http://localhost:8080/api/bookToBuy/get/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const deleteBookToBuy = async (bookID) => {
  try {
    const response = await instance.delete(`http://localhost:8080/api/bookToBuy/delete/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

export const updateBookToBuyStatut = async (bookID) => {
  try {
    const response = await instance.put(`http://localhost:8080/api/bookToBuy/update/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error updating book status:', error);
    throw error;
  }
};






// import axios from 'axios';

// export const getAllBookToBuy = async () => {
//   try {
//     const getAllBookToBuy = await axios.get("http://localhost:8080/api/bookToBuy/getAll");
//     console.log(getAllBookToBuy);
//     return getAllBookToBuy.data;
//   } catch (error) {
//     console.error('Error fetching book to buy:', error);
//     return [];
//   }
// };

// // Fonction pour créer un livre à acheter avec une image
// export const createBookToBuy = async (formData) => {
//   try {
//     const response = await axios.post("http://localhost:8080/api/bookToBuy/create", formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data' // Indiquer que le contenu est de type "multipart/form-data" pour gérer les fichiers
//       }
//     });
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating book:', error);
//     return [];
//   }
// };

// export const getBookToBuy = async (bookID) => {
//   try {
//     const response = await axios.get(`http://localhost:8080/api/bookToBuy/get/${bookID}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching book details:', error);
//     throw error;
//   }
// };

// export const deleteBookToBuy = async (bookID) => {
//   try {
//     const response = await axios.delete(`http://localhost:8080/api/bookToBuy/delete/${bookID}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     throw error;
//   }
// };

// export const updateBookToBuyStatut = async (bookID) => {
//   try {
//     const response = await axios.put(`http://localhost:8080/api/bookToBuy/update/${bookID}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating book status:', error);
//     throw error;
//   }
// };