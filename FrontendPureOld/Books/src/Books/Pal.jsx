import PropTypes from 'prop-types';

const Book = (props) => {
  const { bookList, completed } = props;
  // const { bookList, completed, deleted } = props;

  return (
    <section>
      {bookList.map((i) => (
        <div key={i.id}>
          {/* Affichage du titre et de l'auteur */}
          <h4>{i.title}</h4>
          <p>de {i.author}</p>
          <label>
            Lu :
            <input
              type="checkbox"
              checked={i.read}  // Utilisation de la propriété 'read' pour déterminer l'état de lecture
              onChange={() => completed(i.id)}  
            />
          </label>
          
          
          {/* Affichage de l'image */}
          <img src={i.imageUrl} alt={i.title} style={{ maxWidth: '100px' }} />
          {/* Case à cocher pour indiquer si le livre a été lu */}
         

          {/* Boutons pour supprimer et marquer comme complété
          <button onClick={() => deleted(i.id)}>🗑️</button> */}
        </div>
      ))}
    </section>
  );
};

Book.propTypes = {
  bookList: PropTypes.array,
  completed: PropTypes.func,
  deleted: PropTypes.func
};

export default Book;