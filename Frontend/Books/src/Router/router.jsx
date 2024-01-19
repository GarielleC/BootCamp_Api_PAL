// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../Home/Home.jsx';
import BookToBuy from '../Books/BookToBuy.jsx';
import BookToRead from '../Books/BookToRead.jsx';
import ReadLibrary from '../Books/ReadLibrary.jsx';
// import Login from "../components/pages/Login/Login.jsx";
// import Register from "../components/pages/Register/Register.jsx";
// import LandingPage from "../components/pages/LandingPage/LandingPage.jsx";



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
        ],
    },
]);

export default router;
        