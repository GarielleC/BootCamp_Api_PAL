// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../Home/Home.jsx';
import BookToBuy from '../Books/BookToBuy.jsx';
import BookToRead from '../Books/BookToRead.jsx';
import ReadLibrary from '../Books/ReadLibrary.jsx';
import Login from '../Compte/Login/Login.jsx';
import Register from '../Compte/Register/Register.jsx';
import LoadingPage from '../LoadingPage/Loading.jsx';



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
                path: "booktobuy",  
                element: <BookToBuy />,
            },
            {
                path: "booktoread",  
                element: <BookToRead />,
            },
            {
                path: "readlibrary", 
                element: <ReadLibrary />,
            },
            {
                path: "loadingPage",
                element: <LoadingPage />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
]);

export default router;
        