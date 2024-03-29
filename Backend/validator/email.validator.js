
const emailValidator = (req, res, next) => {
    const { email } = req.body;
    console.log('Email extrait :', email);

    
    // Regex qui permet de validé l'email
    const regexEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Vérifiez si l'email est valide
    if (!regexEmail.test(email)) {
        return res.status(400).json({
            message: "Format d'email invalide.",
        });
    }
    console.log('Validation de l\'email réussie.');
    next();
};

module.exports = emailValidator;