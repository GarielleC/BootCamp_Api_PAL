import axios from 'axios';

export const getAllBookToBuy = async () => {
  try {
    const getAllBookToBuy = await axios.get("http://localhost:8080/api/bookToBuy/getAll");
    console.log(getAllBookToBuy);
    return getAllBookToBuy.data;
  } catch (error) {
    console.error('Error fetching book to buy:', error);
    return [];
  }
};

export const createBookToBuy = async () => {
  try {
    const createBookToBuy = await axios.post("http://localhost:8080/api/bookToBuy/create");
    console.log(createBookToBuy);
    return createBookToBuy.data;
  } catch (error) {
    console.error('Error creating book:', error);
    return [];
  }
};

export const getBookToBuy = async (bookID) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/bookToBuy/get/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const deleteBookToBuy = async (bookID) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/bookToBuy/delete/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

export const updateBookToBuyStatut = async (bookID) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/bookToBuy/update/${bookID}`);
    return response.data;
  } catch (error) {
    console.error('Error updating book status:', error);
    throw error;
  }
};