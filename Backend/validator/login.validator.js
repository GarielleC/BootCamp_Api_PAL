module.exports = function (req, res, next) {
    const { password } = req.body;

    console.log("Password received:", password); // Debugging: afficher le mot de passe reçu

    let errors = [];

    if (!password || password.length < 12) {
        errors.push("Votre mot de passe doit contenir au moins 12 caractères.");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Votre mot de passe doit contenir au moins une lettre majuscule.");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Votre mot de passe doit contenir au moins une lettre minuscule.");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Votre mot de passe doit contenir au moins un chiffre.");
    }

    if (!/[!@#$%^&*]/.test(password)) {
        errors.push(
            "Votre mot de passe doit contenir au moins un caractère spécial parmi !@#$%^&*.",
        );
    }

    console.log("Validation errors:", errors); // Debugging: afficher les erreurs de validation

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation du mot de passe échouée.",
            errors: errors,
        });
    }

    next();
};
