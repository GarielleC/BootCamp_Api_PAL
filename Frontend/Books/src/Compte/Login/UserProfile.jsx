import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await AuthService.fetchUserProfile();
                setProfile(data);
            } catch (error) {
                console.error('Erreur lors de la récupération du profil utilisateur :', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <p>Chargement...</p>;

    return (
        <div>
            <h1>Profil Utilisateur</h1>
            <p>Email : {profile.email}</p>
            {/* Affichez d'autres informations utilisateur si nécessaire */}
        </div>
    );
};

export default UserProfile;



// // UserProfile.jsx
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../services/AuthContext';
// import AuthService from '../../services/AuthService';

// const UserProfile = () => {
//     const { userProfile } = useAuth();
//     const [profile, setProfile] = useState(null);
    

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const data = await AuthService.fetchUserProfile();
//                 setProfile(data);
//             } catch (error) {
//                 console.error('Erreur lors de la récupération du profil utilisateur :', error);
//             }
//         };

//         fetchProfile();
//     }, []);

//     if (!profile) return <p>Chargement...</p>;

//     return (
//         <div>
//             <h1>Profil Utilisateur</h1>
//             <p>Email : {profile.email}</p>
//             {/* Affichez d'autres informations utilisateur si nécessaire */}
//         </div>
//     );
// };

// export default UserProfile;
