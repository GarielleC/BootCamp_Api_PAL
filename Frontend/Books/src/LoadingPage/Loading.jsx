import {useState} from 'react';
import Register from '../Compte/Register/Register'
import Login from '../Compte/Login/Login';

const LoadingPage = () => {

    const [isRegistered, setIsRegistered] = useState(false);


    const handleFormDisplay = () => {
        console.log('test');
        setIsRegistered(!isRegistered)
    }

    return (
        <>
            {isRegistered ? <Login setIsRegistered={handleFormDisplay}/> : <Register setIsRegistered={handleFormDisplay}/>}
        </>
    )
}

export default LoadingPage;