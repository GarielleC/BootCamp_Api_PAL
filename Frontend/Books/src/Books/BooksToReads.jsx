import { useState } from "react";
import Form from "./Form";
import Pal from "./Pal";
import { nanoid } from 'nanoid';

const BooksRead = [
    { id: nanoid(), title: 'L\'héritage de l\'esprit-roi', author: 'Claire Krust', completed: false, imageUrl:'../src/images/heritage.jpg' },
    { id: nanoid(), title: 'Les dieux du campus -Tome 1 : Leander', author: 'F.V. Estyer et Phoënix B. Asher', completed: false, imageUrl:'../src/images/LeanderDieuxCampus01.jpg' },
    { id: nanoid(), title: 'Troublemaker', author: 'Alfreda Enwy', completed: false, imageUrl:'../src/images/Troublemaker.jpg' },
    { id: nanoid(), title: 'Heart Players - Tome 2 : The Heart Beat ', author: 'Alice Desmerveilles', completed: false, imageUrl:'../src/images/HeartBeat.jpg' },
    { id: nanoid(), title: 'Say you swear', author: 'Meagan Brandy', completed: false, imageUrl:'../src/images/say.jpg' },
    { id: nanoid(), title: 'Doppelganger', author: 'David Stahler Jr', completed: false, imageUrl:'../src/images/Doppelganger.jpg' },
    { id: nanoid(), title: 'Vive la Reine des citrouilles : Collector', author: 'Shea Earnshaw et Arnold Petit', completed: false, imageUrl:'../src/images/ReineDesCitrouilles.png' },
    {id: nanoid(), title: 'L\'étrange noël de Mr Jack - Le roman du film : Collector', author: 'Arnold Petit et Megan Sepherd', completed: false, imageUrl:'../src/images/MrJack.png' },
    { id: nanoid(), title: 'Le voleur de baisers : Collector', author: 'L.J. Shene', completed: false, imageUrl: '../src/images/VoleurDeBaiser.png' },
    {id: nanoid(), title: 'L\'As de coeur : Collector', author: 'Morgane Moncomble', completed: false, imageUrl: '../src/images/as.png' },
    { id: nanoid(), title:'Hunger   Games : La ballade du serpent et de l\'oiseau chanteur', author:'Suzanne Collins', completed: false, imageUrl: '../src/images/hunger.jpg'  },
    { id: nanoid(), title: 'Campus drivers- Tome 1 : supermad: : Collector ', author: 'CS.Quill', completed: false, imageUrl: '../src/images/campus.png'  },
    { id: nanoid(), title: 'Adopted love - Tome 1 : Collector', author: 'Gaïa Alexia', completed: false, imageUrl: '../src/images/adoptedLove.png' },
    {id: nanoid(), title: 'Après la tempête : Collector', author: 'Laura S.Wild', completed: false, imageUrl: '../src/images/tempete.png' },
    {id: nanoid(), title: 'Red Falcon', author: 'Aurore Payelle', completed: false, imageUrl: '../src/images/redFalcon.jpg' },
    { id: nanoid(), title: 'Sanglante éternité', author: 'Océane Ghanem', completed: false, imageUrl: '../src/images/sanglante.jpg'},
    { id: nanoid(), title: 'Bienvenue à la Fayette : Collector', author: 'Océane Ghanem', completed: false, imageUrl: '../src/images/lafayette.png'},
    { id: nanoid(), title: 'A contre sens : Noah - TOME 1', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/noah.jpg' },
    { id: nanoid(), title: 'A contre sens : Nick - TOME 2', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/nick.jpg' },
    {id: nanoid(), title: 'A contre sens : Jalousie - TOME 3', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/jalousie.jpg' },
    {id: nanoid(), title: 'A contre sens : Confiance - Tome 4 ', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/confiance.jpg'},
    {id: nanoid(), title: 'A contre sens : Promesse - Tome 5', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/promesse.jpg'},
    {id: nanoid(), title: 'A contre sens : Final - Tome 6', author: 'Mercedes Ron', completed: false,   imageUrl: '../src/images/final.jpg'},
    {id: nanoid(), title: 'The Outsider', author: ' Stephen King', completed: false,   imageUrl: '../src/images/outsider.jpg'},
    {id: nanoid(), title: 'Fallen Angel', author: 'Camille Creati', completed: false,   imageUrl: '../src/images/Fallen.jpg'},
    {id: nanoid(), title: 'Rebel University - Tome 1 : Hot as Hell', author: 'Alicia Garnie et Alfreda Enwy', completed: false,   imageUrl: '../src/images/Rebel01.jpg'},
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
        // setTotalBooks(updatedBookList.length);
        
    };

    const handleUpdate = (val) => {
        const updatedBookList = [...bookList, { ...val, id: nanoid() }];
        setBookList([...bookList, val]);
        // setTotalBooks(updatedBookList.length);
    };

    return (
        <section>
            <Form updateList={handleUpdate} />
            {/* Utilisation de la bonne variable bookList au lieu de BookList */}
            <Pal bookList={bookList} deleted={handleDelete} completed={handleComplete} />
            {/* Afficher le total des livres */}
            {/* <p>Total des livres : {totalBooks}</p> */}
        </section>
    );
};

export default BookListRead; 