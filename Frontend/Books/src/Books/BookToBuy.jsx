import React, { useState, useEffect } from "react";
import {
    getAllBookToBuy,
    updateBookToBuyStatut,
    deleteBookToBuy,
    createBookToBuy,
} from "../services/bookToBuy.service";
import LivreFermeLogo from "../Logos/livreFerme1.png";
import PoubelleBuy from "../Logos/Poubelle.png";
import "../Css/BookToBuy.css";

const BookToBuyList = () => {
    const [bookToBuyList, setBookToBuyList] = useState([]);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        prix: "",
        buyLink: "",
        imageUrl: "",
    });

    // Permet l'apparition du formulaire de création
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
    const getBookToBuy = async () => {
        try {
            const res = await getAllBookToBuy();
            if (res) {
                setBookToBuyList(res);
            }

            // Trier les livres par ordre alphabétique ici
            const sortedBooks = [...res];
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            setBookToBuyList(sortedBooks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getBookToBuy();
    }, []);

    // Fonction pour la mise à jour du livre
    const handleUpdateStatus = async (bookID) => {
        try {
            await updateBookToBuyStatut(bookID);
            // Rafraîchir la liste après la mise à jour du statut
            getBookToBuy();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);
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
                await deleteBookToBuy(bookID);
                // Rafraîchir la liste après la suppression du livre
                getBookToBuy();
            }
        } catch (error) {
            console.error("Erreur lors de la supression du livre :", error);
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
    const handleCreateBook = async () => {
        try {
            // Créer un FormData pour envoyer les données du livre et l'image
            const formData = new FormData();
            formData.append("title", newBook.title);
            formData.append("author", newBook.author);
            formData.append("prix", newBook.prix);
            formData.append("buyLink", newBook.buyLink);
            formData.append("imageUrl", imageFile); // Ajouter le fichier image

            // Envoyer les données (remplacer createBookToBuy par votre fonction d'API)
            await createBookToBuy(formData);

            // Rafraîchir la liste après l'ajout du livre
            getBookToBuy();

            // Réinitialiser le formulaire
            resetForm();
        } catch (error) {
            console.error("Error creating book:", error);
            // Message d'erreur lors de la création du livre
            alert("Erreur lors de la création du livre à acheter. Veuillez réessayer.");
        }
    };

    // Fonction pour calculer le total des livres à lire
    const calculateTotalBooksToBuy = () => {
        return bookToBuyList.length;
    };

    return (
        <section>
            {/* Boutton pour retourner à l'accueil */}
            <div className="RetourButton">
                <button>
                    <div className="BackBuy">
                        <a href="/">
                            <p>⮨</p>
                            <p>Retour</p>
                        </a>
                    </div>
                </button>
            </div>

            {/* Titre de la page */}
            <div className="big_title_buy">
                <img
                    className="LivreFermeLogoBuy"
                    src={LivreFermeLogo}
                    alt="Logo Livre Fermé"
                />
                <h1>Liste de livres à acheter</h1>
            </div>

            {/* Affiche le total des livres à lire */}
            <h2>
                Total des livres a acheter :
                <span class="number">{calculateTotalBooksToBuy()}</span>
            </h2>

            {/* Bouton pour afficher ou masquer le formulaire */}
            <button className="FormVis" onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible
                    ? "Masquer le formulaire"
                    : "Création d'un nouveau livre à acheter"}
            </button>

            {/* Formulaire pour créer un nouveau livre à acheter */}
            {isFormVisible && (
                <div>
                    <form className="FormulaireBuy">
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
                        <label>Lien pour acheter :</label>
                        <input
                            type="text"
                            name="buyLink"
                            value={newBook.buyLink}
                            onChange={handleInputChange}
                        />
                        <label>Image :</label>
                        <input type="file" onChange={handleImageChange} />

                        {/* Boutton qui permet d'ajouter le livre créer */}
                        <div className="BouttonCrea">
                            <button type="button" onClick={handleCreateBook}>
                                ➕ Ajouter
                            </button>
                            <button type="reset" onClick={resetForm}>
                                Réinitialiser
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="ContainerBuy">
                {bookToBuyList && bookToBuyList.length > 0 ? (
                    bookToBuyList.map((book, index) => (
                        <div className="LivreBuy" key={index}>
                            <div className="TitreBuy">
                                <h3>{book.title}</h3>
                                <p>de {book.author}</p>
                            </div>

                            <img
                                className="LivreBuy__img"
                                src={`http://localhost:8080/images/${book.imageUrl}`}
                            />

                            <div className="Informations">
                                <p>
                                    Prix :{" "}
                                    <span className="prix-rouge">{book.prix} €</span>
                                </p>

                                <p>
                                    Lien pour l'acheter :
                                    <a
                                        href={book.buyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                       💸 Cliquez ici pour acheter le livre
                                    </a>
                                </p>
                            </div>
                            <div className="Button-container">
                                <button
                                    className="Achat"
                                    onClick={() => handleUpdateStatus(book.id)}
                                >
                                    ➕ Ajouter
                                </button>
                                <button
                                    className="DeleteButtonBuy"
                                    onClick={() => handleDeleteBook(book.id)}
                                >
                                    <img
                                        className="PoubelleBuy"
                                        src={PoubelleBuy}
                                        alt="Logo Poubelle"
                                    />
                                </button>
                            </div>
                            {/* <hr /> */}
                        </div>
                    ))
                ) : (
                    <p>Aucun livre à acheter pour le moment.</p>
                )}
            </div>
        </section>
    );
};

export default BookToBuyList;
