const multer = require("multer");
const path = require("path");

// Définir le stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); 
    },
    filename: function (req, file, cb) {
        // Utilisez Date.now() permet d avoir un fichier unique
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Filtrer les fichiers pour accepter que les images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("N'est pas une image ! Merci upload une images."), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
