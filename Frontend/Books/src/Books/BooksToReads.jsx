import { useState } from "react";
import Form from "./Form";
import Pal from "./Pal";
import { nanoid } from 'nanoid';

const BooksRead = [
    { id: nanoid(), title: 'L\'héritage de l\'esprit-roi', author: 'Claire Krust', completed: false, imageUrl:'../src/images/heritage.png' },
    { id: nanoid(), title: 'Doppelganger', author: 'David Stahler Jr', completed: false, imageUrl:'../src/images/Doppelganger.jpg' },
    { id: nanoid(), title: 'Vive la Reine des citrouilles', author: 'Shea Earnshaw et Arnold Petit', completed: false, imageUrl:'../src/images/ReineDesCitrouilles.png' },
    {id: nanoid(), title: 'L\'étrange noël de Mr Jack - Le roman du film', author: 'Arnold Petit et Megan Sepherd', completed: false, imageUrl:'../src/images/MrJack.png' },
    { id: nanoid(), title: 'Le voleur de baisers', author: 'L.J. Shene', completed: false, imageUrl: '../src/images/VoleurDeBaiser.png' },
    {id: nanoid(), title: 'L\'As de coeur', author: 'Morgane Moncomble', completed: false, imageUrl: '../src/images/as.png' },
    { id: nanoid(), title:'Hunger   Games : La ballade du serpent et de l\'oiseau chanteur', author:'Suzanne Collins', completed: false, imageUrl: '../src/images/hunger.jpg'  },
    { id: nanoid(), title: 'Campus drivers : supermad - TOME 1 ', author: 'CS.Quill', completed: false, imageUrl: '../src/images/campus.png'  },
    { id: nanoid(), title: 'Adopted love', author: 'Gaïa Alexia', completed: false, imageUrl: '../src/images/adoptedLove.png' },
    {id: nanoid(), title: 'Après la tempête', author: 'Laura S.Wild', completed: false, imageUrl: '../src/images/tempete.png' },
    {id: nanoid(), title: 'Red Falcon', author: 'Aurore Payelle', completed: false, imageUrl: '../src/images/redFalcon.jpg' },
    { id: nanoid(), title: 'Sanglante éternité', author: 'Océane Ghanem', completed: false, imageUrl: '../src/images/sanglante.jpg'},
    { id: nanoid(), title: 'A contre sens : Noah - TOME 1', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/noah.jpg' },
    { id: nanoid(), title: 'A contre sens : Nick - TOME 2', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/nick.jpg' },
    {id: nanoid(), title: 'A contre sens : Jalousie - TOME 3', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/jalousie.jpg' },
    {id: nanoid(), title: 'A contre sens : Confiance - Tome 4 ', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/confiance.jpg'},
    {id: nanoid(), title: 'A contre sens : Promesse - Tome 5', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/promesse.jpg'},
    {id: nanoid(), title: 'A contre sens : Final - Tome 6', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/final.jpg'},
    {id: nanoid(), title: 'The Outsider', author: ' Stephen King', completed: false,   imageUrl: '../src/images/outsider.jpg'},
];

const BookListRead = () => {
    const [bookList, setBookList] = useState(BooksRead);

    const handleDelete = (id) => {
        
        const updatedBookList = bookList.filter((item) => item.id !== id);
        setBookList(updatedBookList);
    };

    const handleComplete = (id) => {
        const updatedBookList = bookList.map((item) => {
            if (item.id === id) {
                return { ...item, completed: true };
            } else {
                return item;
            }
        });
        setBookList(updatedBookList);
        
    };

    const handleUpdate = (val) => {
        const updatedBookList = [...bookList, { ...val, id: nanoid() }];
        setBookList([...bookList, val]);
    };

    return (
        <section>
            <Form updateList={handleUpdate} />
            {/* Utilisation de la bonne variable bookList au lieu de BookList */}
            <Pal bookList={bookList} deleted={handleDelete} completed={handleComplete} />
        </section>
    );
};

export default BookListRead; 