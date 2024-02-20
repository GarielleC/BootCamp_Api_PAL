import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "./Router/navbar";
import Navbar from "./Router/navbar.Copie";
import "./Css/Normalize.css";
import "./App.css";
import { AuthProvider } from "./services/AuthContext";

function App() {
    const [key, setKey] = useState(0);

    const forceRerender = () => {
        setKey((prevKey) => prevKey + 1); // Change la clé pour forcer le re-rendu
    };

    return (
        <AuthProvider>
            <div className="body" key={key}>
                <main>
                    <div className="App">
                        <Navbar forceRerender={forceRerender} />
                        <Outlet />
                        <footer>
                            <p>&copy; 2024 ReadEase</p>
                        </footer>
                    </div>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
