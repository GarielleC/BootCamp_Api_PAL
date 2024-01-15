// importation des modules nécessaires
const express = require("express");

// Importation des modèles Book et STRING depuis Sequelize
const { Book } = require('../Models');
const { STRING } = require("sequelize");

// Contrôleur qui gère les opérations qui sont liées aux livres
const bookController = {

    //Fonction pour obtenir tous les livres
    getAllBook: async (req, res) => {
        try {
            //Récupération des tous les livres qui sont dans la DB
            const books = await Book.findAll();
            res.status(200).json(books);

            //Message 404 en cas d'erreur
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    //Fonction pour obtenir un livre spécifique grâce à l'ID
    getBook: async (req, res) => {
        try {
            //Récupération de l'ID d'un livre depuis les paramètres de la requête
            const bookId = Number(req.params.bookID);
            // Recherche du livre avec l'ID donné dans la DB
            const book = await Book.findByPk(bookId);

            //Condition si le livre n'est pas trouvé, message d'erreur 404
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Formatage des données du livre pour la réponse
            const finalBook = {
                id: book.id,
                title: book.title,
                author: book.author,
                prix: book.prix,
                buyLink: book.buyLink,
                imageUrl: book.imageUrl,
                createdAt: book.createdAt,
                updatedAt: book.updatedAt
            };
            //Affichage des données dans la console
            console.log(finalBook);

            //Renvoie du livre en tant que réponse JSON
            res.json(finalBook);
        } catch (error) {
            //Message d'erreur si y en a une
            res.status(500).json({ error: error.message });
        }
    },

        // Création d'un nouveau livre
    createBook: async (req, res) => {
        try {
            //Récupération du livre depuis le corps de la requête
            const { title, author, prix, buyLink, imageUrl } = req.body;
           
            //Création d'un nouveau livre dans la DB 
            const newBook = await Book.create({
                title,
                author,
                prix,
                buyLink,
                imageUrl,
            });

                // Renvoi du nouveau livre en tant que réponse JSON
            res.status(201).json(newBook);
        } catch (error) {
            // Message d'erreur si la réponse JSON ne fonctionne pas
            console.error(error);
            res.status(500).json({ error: 'Failed to create book' });
        }
    },

        // Mise à jour du livre existant
    updateBook: async (req, res) => {
        try {
            //Récupération de l'ID du livre
            const bookId = Number(req.params.bookID);
            // Récupération des données mise à jour du livre
            const { title, author, prix, buyLink, imageUrl } = req.body;
            // Recherche du livre avec l'Id donné dans la db
            const book = await Book.findByPk(bookId);

            // Message d'erreur si le livre n'est pas trouvé
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Mise à jour des données dans le DB
            await book.update({
                title,
                author,
                prix,
                buyLink,
                imageUrl,
            });

                // Renvoi d'un message de succès
            res.status(200).json({ message: 'Book updated' });
            // en cas d'échec, message d'erreur
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Suppresion du livre
    deleteBook: async (req, res) => {
        try {
            // Récupération dde l'Id d'un livre 
            const bookId = Number(req.params.bookID);
            //Recherche du livre dans la DB grâce à l'Id
            const book = await Book.findByPk(bookId);

            //Si le livre n'est pas trouvé, renvoi une erreur 404
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Suppression du livre dans la db
            await book.destroy();

            // Renvoi d'un message à succès
            res.status(200).json({ message: 'Book deleted' });
            // Génère un message d'erreur si y en a une 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
};

// Exportation
module.exports = bookController;