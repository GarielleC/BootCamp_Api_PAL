// Définition d'une classe authDTO 
class authDTO {

     // Déclaration des propriétés de la classe
    id;
    login;
    password;
    hashedPassword;

    // Constructeur de la classe, qui prend un objet 'data' en paramètre
    constructor(data) {
        // Initialisation des propriétés de la classe avec les valeurs fournies dans 'data'
        this.id = data.id;
        this.login = data.login;
        this.password = data.password;
        this.hashedPassword = data.hashedPassword;
    }
}

// Exportation de la classe
module.exports = authDTO;