import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(AuthService.isAuthenticated());
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



// import { createContext, useContext, useState, useEffect } from "react";
// import AuthService from "./AuthService";
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

//     useEffect(() => {
//         const handleStorageChange = () => {
//             setIsAuthenticated(AuthService.isAuthenticated());
//         };

//         window.addEventListener("storage", handleStorageChange);

//         return () => {
//             window.removeEventListener("storage", handleStorageChange);
//         };
//     }, []);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

