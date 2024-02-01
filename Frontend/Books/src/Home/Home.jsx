// import React, { useEffect } from 'react';
// import { createRoot } from 'react-dom/client'; 
// import './Home.scss';
import React from 'react';
import ImageALire from '../Logos/CharlieStory.png';
import FondLivres from '../Logos/fond.jpg';
import '../Css/Normalize.css';
import '../Css/Home.css';




const Home = () => {
   

    return (
        <section className="Home">
            <div>
                {/* <div className="FondHome">
                    <img className="FondLivres" src={FondLivres} alt="Fond livres" />
                </div> */}
                <h2>Bienvenue sur ReadEase</h2>

                <h3>ReadEase - L'Art de Simplifier Votre Monde Livresque</h3>
                    <p>Bienvenue sur ReadEase, l'endroit où la lecture devient un plaisir organisé ! Perdre la trace de votre Pile À Lire peut être frustrant, mais ReadEase est là pour transformer votre expérience de lecture.</p>

                    <p>Explorez la convivialité de notre plateforme qui mémorise chaque livre que vous souhaitez acquérir. Planifiez vos futures lectures, élaborez votre bibliothèque virtuelle, et gérez votre PAL sans le moindre souci.</p>

                    <p>En un geste simple, ajoutez un livre à votre liste d'achats, il s'incorpore automatiquement à votre liste à lire. Une fois savouré, le livre se range naturellement dans votre bibliothèque personnelle. Tout cela à la portée d'un simple clic !</p>

                    <p>ReadEase, où la gestion de vos livres devient aussi plaisante que la lecture elle-même. Découvrez une nouvelle manière de vivre votre passion pour les livres dès aujourd'hui !</p>
            </div>
            
            <div>
                <h3 className='Fonctionnalités'>Découvrez les fonctionnalités exceptionnelles</h3>
                <h4 className='Acheter'>📘 Livres à Acheter:</h4>
                    <p>Ajoutez instantanément les livres qui vous captivent à votre liste d'achats en un simple clic. Gardez une trace organisée de toutes les œuvres qui vous intriguent et que vous avez l'intention d'acquérir dans le futur.</p>
            </div>

            <div className="Lire">
                <div className="ImageWrapper">
                    <img className="ImageALire" src={ImageALire} alt="Image A Lire" />
                    <p className="copyright">&#169; Illustratrice: Carez Gabrielle</p>
                </div>
                <div className="TexteALire">
                    <h4>📖 Livres à Lire :</h4>
                    <p>Plongez dans vos prochaines aventures littéraires en toute planification.</p>
                    <p>Ajoutez les livres qui vous font rêver à votre liste de lecture.</p> 
                    <p>Une fois lus, cochez-les et regardez-les glisser avec satisfaction dans votre bibliothèque personnelle.</p>
                </div>
            </div>

            <div className='Biblio'>
                <h4>📚 Bibliothèque Personnelle:</h4>
                    <p>Créez votre propre sanctuaire littéraire virtuel en ajoutant les livres que vous avez dévorés.</p>

                    <p>Votre bibliothèque personnelle vous attend à tout moment, offrant une escapade visuelle pour vous replonger dans vos lectures passées.</p> 
                        
                    <p>Explorez, planifiez et savourez chaque page avec ReadEase !</p>
            </div>
            <div>
                <h3>Explorez l'Art de la Lecture Personnalisée :</h3>
                    <p>Connectez-vous pour déverrouiller un monde de fonctionnalités exclusives. Plongez dans la joie de lire en organisant, planifiant et explorant le vaste univers des histoires captivantes. Chaque page révèle une nouvelle aventure, chaque livre ouvre une porte vers des horizons inexplorés. Permettez-nous de transformer votre expérience de lecture. Embarquez pour votre périple littéraire dès maintenant ! 📚✨</p>
            </div>
        </section>
    )
}

export default Home;