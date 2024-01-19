// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../Home/Home.jsx';
import BookToBuy from '../Books/BookToBuy.jsx';
import BookToRead from '../Books/BookToRead.jsx';
import ReadLibrary from '../Books/ReadLibrary.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            
            {
                path: "books/booktobuy",  // Ajout du /
                element: <BookToBuy />,
            },
            {
                path: "books/booktoread",  // Ajout du /
                element: <BookToRead />,
            },
            {
                path: "books/readlibrary",  // Ajout du /
                element: <ReadLibrary />,
            },
        ],
    },
]);

export default router;
        