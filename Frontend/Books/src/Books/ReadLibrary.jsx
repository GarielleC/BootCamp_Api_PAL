import React, { useState, useEffect } from "react";
import {
    getAllReadLibrary,
    addReadLibrary,
    deleteReadLibrary,
} from "../services/ReadLibrary.service";
import BiblioLogoPage from "../Logos/biblio1.png";
// import Poubelle from '../Logos/Poubelle.png';
import "../Css/RedLibrary.css";

const ReadLibraryList = () => {
    const [ReadLibraryList, setReadLibraryList] = useState([]);
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
        // Mettre à jour l'état avec le fichier sélectionné
        setImageFile(e.target.files[0]);
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

        // Etat pour le fichier image
        setImageFile(null);
    };

    // Apparition de tous les livres à lire
    const getReadLibrary = async () => {
        try {
            const res = await getAllReadLibrary();
            if (res) {
                setReadLibraryList(res);
            }

            // Trier les livres par ordre alphabétique ici
            const sortedBooks = [...res];
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            setReadLibraryList(sortedBooks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getReadLibrary();
    }, []);

    // Fonction pour la mise à jour du livre
    const handleUpdateStatus = async (bookID) => {
        try {
            await updateReadLibraryStatut(bookID);

            // Rafraîchir la liste après la mise à jour du statut
            getReadLibrary();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);
        }
    };

    // // Fonction pour la suppression d'un livre
    // const handleDeleteReadLibrary = async (bookID) => {
    //   try {
    //      // Afficher une boîte de dialogue de confirmation
    //     const isConfirmed = window.confirm(
    //         "Êtes-vous sûr de vouloir supprimer ce livre ?",
    //     );

    //     // Vérifier si l'utilisateur a confirmé
    //     if (isConfirmed) {
    //         await deleteReadLibrary(bookID);
    //         // Rafraîchir la liste après la suppression du livre
    //         getReadLibrary();
    //     }
    // } catch (error) {
    //     console.error("Erreur lors de la supression du livre :", error);
    // }
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    // Fonction pour créer un livre
    const handleAddReadLibrary = async () => {
        try {
            // Créer un FormData pour envoyer les données du livre et l'image
            const formData = new FormData();
            formData.append("title", newBook.title);
            formData.append("author", newBook.author);
            formData.append("prix", newBook.prix);
            formData.append("buyLink", newBook.buyLink);
            formData.append("imageUrl", imageFile); // Ajouter le fichier image

            // Envoyer les données
            await addReadLibrary(formData);

            // Rafraîchir la liste après l'ajout du livre
            getReadLibrary();

            // Réinitialiser le formulaire
            resetForm();
        } catch (error) {
            console.error("Error creating book:", error);
            // Message d'erreur lors de la création du livre
            alert("Erreur lors de la création du livre à acheter. Veuillez réessayer.");
        }
    };

    // Fonction pour calculer le total des livres à lire
    const calculateTotalBooks = () => {
        return ReadLibraryList.length;
    };

    return (
        <section>
            {/* Boutton pour retourner à l'accueil */}
            <div className="Retour">
                <button>
                    <div className="Back">
                        <a href="/">
                            <p>⮨</p>
                            <p>Retour</p>
                        </a>
                    </div>
                </button>
            </div>

            {/* Titre de la page */}
            <div className="big_title_biblio">
                <img className="BiblioLogoPage" src={BiblioLogoPage} alt="Logo Biblio" />
                <h1>Bibliothèque</h1>
            </div>

            {/* Affiche le total des livres à lire */}
            <h2 className="Tot">
                Total des livres lus :
                <span class="number_lib">{calculateTotalBooks()}</span>
            </h2>

            {/* Bouton pour afficher ou masquer le formulaire */}
            <button className="visibility" onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible
                    ? "Masquer le formulaire"
                    : "Création d'un nouveau livre dans la bibliothèque"}
            </button>

            {/* Formulaire pour créer un nouveau livre à acheter */}
            {isFormVisible && (
                <div>
                    <form className="Formulaire">
                        <h2>Ajout d'un livre à mettre dans la bibliothèque</h2>

                        <label>Titre :</label>
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

                        {/* Boutton qui permet d'ajouter le livre créer */}
                        <div className="BouttonCreation">
                            <button type="button" onClick={handleAddReadLibrary}>
                                ➕ Ajouter
                            </button>
                            <button type="reset" onClick={resetForm}>
                                Réinitialiser
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="Container">
                {ReadLibraryList && ReadLibraryList.length > 0 ? (
                    ReadLibraryList.map((book, index) => (
                        <div className="Livre" key={index}>
                            <div className="Titre">
                                <h3>{book.title}</h3>
                                <p>de {book.author}</p>
                            </div>
                            <div className="Images">
                                <img
                                    className="Livre_img"
                                    src={`http://localhost:8080/images/${book.imageUrl}`}
                                />
                                {/* <button onClick={() => handleDeleteBook(book.id)}>🗑️</button> */}
                            </div>
                            {/* <button className="DeleteButton" onClick={() => handleDeleteReadLibrary(book.id)}>
                  <img className="Poubelle" src={Poubelle} alt="Logo Poubelle" />
              </button> */}
                            {/* Permet une séparation entre chaque livre */}
                            {/* <hr /> */}
                        </div>
                    ))
                ) : (
                    <p>Aucun livre à lire pour le moment.</p>
                )}
            </div>
        </section>
    );
};

export default ReadLibraryList;
