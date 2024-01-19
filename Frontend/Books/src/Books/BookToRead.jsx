import React from "react";
// import { Link } from 'react-router-dom'
// import Form from "./Form";
// import Pal from "./Pal";
// import { nanoid } from 'nanoid';

const BookToRead = () => {
    return (
      <div>
        <h2>📖 Liste de livres à lires</h2>
        <p>coucou</p>
      </div>
    );
  };
  
  export default BookToRead;
// const BookListRead = () => {
//     const [bookList, setBookList] = useState(BooksRead);

//     const handleDelete = (id) => {
        
//         const updatedBookList = bookList.filter((item) => item.id !== id);
//         setBookList(updatedBookList);
//     };

//     const handleComplete = (id) => {
//         const updatedBookList = bookList.map((item) => {
//             if (item.id === id) {
//                 return { ...item, completed: true };
//             } else {
//                 return item;
//             }
//         });
//         setBookList(updatedBookList);
//         // setTotalBooks(updatedBookList.length);
        
//     };

//     const handleUpdate = (val) => {
//         const updatedBookList = [...bookList, { ...val, id: nanoid() }];
//         setBookList([...bookList, val]);
//         // setTotalBooks(updatedBookList.length);
//     };

//     return (
//         <section>
//             <Form updateList={handleUpdate} />
//             {/* Utilisation de la bonne variable bookList au lieu de BookList */}
//             <Pal bookList={bookList} deleted={handleDelete} completed={handleComplete} />
//             {/* Afficher le total des livres */}
//             {/* <p>Total des livres : {totalBooks}</p> */}
//         </section>
//     );
// };

// export default BookListRead; 