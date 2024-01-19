import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
    
    <nav>
        <div>
            <ul>
                
                <li>
                    <Link to='/BookToBuy'>📘 Livres à acheter</Link>
                </li>

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
  