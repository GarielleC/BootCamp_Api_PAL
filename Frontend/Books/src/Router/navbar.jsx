import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import HomeLogo from '../Logos/home.png';


const Navbar = () => {
    const book = {
        ImageUrl: "livreFerme.png",
        imageUrl: "livreOuvert.png",
        
    };
    return (
    
    <nav>
        <div>
            <ul>
                <li>
                    <Link to='/'>
                        <button style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                            <img src={HomeLogo} style={{ width: '2em', height: '2em' }} alt="Logo Accueil" />
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to='/BookToBuy'>
                        {/* <img className="img-reduite"
                                src={
                                    book.ImageUrl
                                        ? `http://localhost:8080/images/${book.imageUrl}`
                                        : "livreFerme.png"
                                }
                                alt="Livre à acheter"/> */}
                                Livres à acheter</Link>
                </li>
                
                {/* <li>
                    <Link to='/BookToBuy'><img src='../Frontend/Books/src/Logos/livre fermé.png'/> Livres à acheter</Link>
                </li> */}
                {/* 📘 */}

                <li>
                    <Link to='/BookToRead'>📖 Livres à livres</Link>
                </li>
                <li>
                    <Link to='/ReadLibrary'>📚 Bibliothèque</Link>
                </li>
            </ul>
        </div>
    </nav>    
    );

};

export default Navbar;
  