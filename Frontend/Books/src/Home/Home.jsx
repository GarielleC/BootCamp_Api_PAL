// import React, { useEffect } from 'react';
// import { createRoot } from 'react-dom/client'; 
// import './Home.scss';
import React from 'react';




const Home = () => {
   

    return (
        <section className='Home'>
            <div className='Produit'>
                <h2>Nos Produits</h2>
                    <p>Explorez notre vaste sélection de drones FPV, de voitures télécommandées, et de tous les composants nécessaires pour les personnaliser et les améliorer. Nous sommes fiers de proposer uniquement les marques les plus réputées de l'industrie pour garantir une performance exceptionnelle.</p>
            </div>
            
            <div className='Drone'>
                <h3>Drones FPV :</h3>
                    <p>Découvrez la sensation du vol immersif grâce à notre gamme de drones FPV. Des courses palpitantes aux vols stables, nous avons le drone parfait pour vous.</p>
            </div>

            <div className='Telecommande'>
                <h3>Voitures Télécommandées :</h3>
                    <p>Plongez dans l'univers passionnant des voitures RC. Choisissez parmi une variété de modèles, du tout-terrain aux voitures de course.</p>
            </div>
            <div className='Composants'>
                <h3>Composants :</h3>
                    <p>Personnalisez et améliorez votre équipement avec notre sélection de composants de haute qualité. Batteries, moteurs, hélices, pièces de rechange et bien plus encore.</p>
            </div>
            <div className='Engaments'>
                <h2>Nos Engagements</h2>
                    <p>Chez RC Land, nous sommes déterminés à offrir à nos clients les meilleurs avantages :</p>
            </div>

            <div className='Expertise'>
                <h3>Expertise :</h3>
                    <p>Notre équipe de passionnés est là pour vous conseiller et répondre à toutes vos questions. Nous partageons notre expertise pour vous aider à prendre des décisions éclairées.</p>
            </div>

            <div className='Quality'>
                <h3>Qualité :</h3>
                    <p>Nous n'offrons que des produits de haute qualité, testés et approuvés par notre équipe d'experts.</p> 
                    </div>

            <div className='Service'>
                <h3>Service Client :</h3> 
                    <p>Votre satisfaction est notre priorité. Notre service client dévoué est là pour vous aider à chaque étape de votre expérience chez RC Land.</p>
            </div>

            <div className='Community'>
                <h3>Communauté :</h3> 
                    <p>Rejoignez notre communauté de passionnés RC. Partagez vos expériences, posez des questions et découvrez de nouvelles façons de profiter de votre équipement.</p>
            </div>

            <div className='fin'>
                <p>Explorez notre site Web pour découvrir notre gamme complète de produits et laissez-nous vous aider à réaliser vos rêves de vol FPV et de courses de voitures télécommandées. Chez RC Land, l'aventure commence ici.</p>
            </div>
        </section>
    )
}

export default Home;