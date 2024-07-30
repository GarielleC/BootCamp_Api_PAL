// Exemple de fonction pour récupérer le profil utilisateur
const getUserProfile = async (userId) => {
    try {
        // Remplacez `User` par le nom de votre modèle
        const userProfile = await db.User.findOne({ where: { id: userId } });
        if (!userProfile) {
            throw new Error("Profil utilisateur non trouvé");
        }
        return userProfile;
    } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
        throw new Error("Erreur lors de la récupération du profil utilisateur");
    }
};
