import React, { useState, useEffect } from "react";
import {
    getAllBookToRead,
    updateBookToReadStatut,
    deleteBookToRead,
    addBookToRead,
} from "../services/bookToRead.service";
import LivreOuvertLogoReadPage from "../Logos/livreOuvert1.png";
import Poubelle from "../Logos/Poubelle.png";
import "../Css/BookToRead.css";

const BookToReadList = () => {
    const [bookToReadList, setBookToReadList] = useState([]);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        prix: "",
        buyLink: "",
        imageUrl: "",
    });

    // État local pour la gestion de la case à cocher
    const [checkedBooks, setCheckedBooks] = useState([]);

    const [isFormVisible, setIsFormVisible] = useState(false);

    // État pour le fichier de l'image
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Mettre à jour l'état avec le fichier sélectionné
    };
      // Fonction pour réinitialiser le formulaire
      const resetForm = () => {
        setNewBook({
            title: "",
            author: "",
            prix: "",
            buyLink: "",
            imageUrl: "",
        });
        setImageFile(null); // Réinitialiser également le fichier image
    };

    // Apparition de tous les livres à lire
    const getBookToRead = async () => {
        try {
            const res = await getAllBookToRead();
            if (res) {
                setBookToReadList(res);
            }

            // Trier les livres par ordre alphabétique ici
            const sortedBooks = [...res];
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            setBookToReadList(sortedBooks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getBookToRead();
    }, []);

    // Fonction pour la mise à jour du livre
    const handleUpdateStatus = async (bookID) => {
        try {
            // Ajout immédiat du livre à la liste des cochés
            setCheckedBooks((prevCheckedBooks) => [...prevCheckedBooks, bookID]);

            // Boite de dialogue de vérification
            const isConfirmed = window.confirm(
                "Êtes-vous sûr de vouloir mettre ce livre dans votre bibliothèque ?",
            );

            // Vérification si l'utilisateur a confirmé
            if (isConfirmed) {
                // Mettre à jour le statut
                await updateBookToReadStatut(bookID);

                // Rafraîchir la liste après la mise à jour du statut
                getBookToRead();
            } else {
                // Si l'utilisateur annule, dla case se décoche automatiquement
                setCheckedBooks((prevCheckedBooks) =>
                    prevCheckedBooks.filter((id) => id !== bookID),
                );
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);

            // Si une erreur se produit, la case se décoche automatiquement
            setCheckedBooks((prevCheckedBooks) =>
                prevCheckedBooks.filter((id) => id !== bookID),
            );
        }
    };

    // Fonction pour la suppression d'un livre
    const handleDeleteBook = async (bookID) => {
        try {
            // Afficher une boîte de dialogue de confirmation
            const isConfirmed = window.confirm(
                "Êtes-vous sûr de vouloir supprimer ce livre ?",
            );

            // Vérifier si l'utilisateur a confirmé
            if (isConfirmed) {
                // Supprimer le livre
                await deleteBookToRead(bookID);

                // Rafraîchir la liste après la suppression du livre
                getBookToRead();
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du livre :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    // Fonction pour créer un livre
    const handleAddBook = async () => {
        try {
            // Créer un FormData pour envoyer les données du livre et l'image
            const formData = new FormData();
            formData.append("title", newBook.title);
            formData.append("author", newBook.author);
            formData.append("prix", newBook.prix);
            formData.append("buyLink", newBook.buyLink);
            formData.append("imageUrl", imageFile); // Ajouter le fichier image

            // Envoyer les données
            await addBookToRead(formData);

            // Rafraîchir la liste après l'ajout du livre
            getBookToRead();
            // Réinitialiser le formulaire
            resetForm();
        } catch (error) {
            console.error("Error creating book:", error);
            // Message d'erreur lors de la création du livre
            alert("Erreur lors de la création du livre à lire. Veuillez réessayer.");
        }
    };
    // Fonction pour calculer le total des livres à lire
    const calculateTotalBooks = () => {
        return bookToReadList.length;
    };

    return (
        <section>
            {/* Bouton pour retourner à l'accueil */}
            <div className="retour_home">
                <button>
                    <div className="home_back">
                        <a href="/">
                            <p>⮨</p>
                            <p>Retour</p>
                        </a>
                    </div>
                </button>
            </div>

            <div className="big_title">
                <img
                    className="LivreOuvertLogoReadPage"
                    src={LivreOuvertLogoReadPage}
                    alt="Logo Livre Ouvert"
                />
                <h1>Liste de livres à lire</h1>
            </div>

            {/* Affiche le total des livres à lire */}
            <h2 className="Total">
                Total des livres à parcourir :
                <span class="number_red">{calculateTotalBooks()}</span>
            </h2>

            {/* Bouton pour afficher ou masquer le formulaire */}
            <button
                className="FormVisibility"
                onClick={() => setIsFormVisible(!isFormVisible)}
            >
                {isFormVisible
                    ? "Masquer le formulaire"
                    : "Création d'un nouveau livre à lire"}
            </button>

            {/* Formulaire pour créer un nouveau livre à acheter */}
            {isFormVisible && (
                <div>
                    <form className="FormulaireRead">
                        <label>Title :</label>
                        <input
                            type="text"
                            name="title"
                            value={newBook.title}
                            onChange={handleInputChange}
                        />
                        <label>Auteur(e)(s) :</label>
                        <input
                            type="text"
                            name="author"
                            value={newBook.author}
                            onChange={handleInputChange}
                        />
                        <label>Prix :</label>
                        <input
                            type="text"
                            name="prix"
                            value={newBook.prix}
                            onChange={handleInputChange}
                        />
                        <label>Lien pour acheter le livre :</label>
                        <input
                            type="text"
                            name="buyLink"
                            value={newBook.buyLink}
                            onChange={handleInputChange}
                        />
                        <label>Image :</label>
                        <input type="file" onChange={handleImageChange} />
                        <button className="ajout" type="button" onClick={handleAddBook}>
                            ➕ Ajouter
                        </button>
                    </form>
                </div>
            )}

            <div className="ContainerRead">
                {bookToReadList && bookToReadList.length > 0 ? (
                    bookToReadList.map((book, index) => (
                        <div className="LivreRead" key={index}>
                            <div className="TitreRead">
                                <h3>{book.title}</h3>
                                <p>de {book.author}</p>
                            </div>
                            <img
                                className="LivreRead__img"
                                src={`http://localhost:8080/images/${book.imageUrl}`}
                            />
                            <div className="checkbox-container">
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${book.id}`}
                                        onChange={() => handleUpdateStatus(book.id)}
                                        checked={checkedBooks.includes(book.id)}
                                    />
                                    <label className="checkbox-label">Lu</label>
                                </div>
                                <button
                                    className="DeleteButton"
                                    onClick={() => handleDeleteBook(book.id)}
                                >
                                    <img
                                        className="Poubelle"
                                        src={Poubelle}
                                        alt="Logo Poubelle"
                                    />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun livre à lire pour le moment.</p>
                )}
            </div>
        </section>
    );
};

export default BookToReadList;
