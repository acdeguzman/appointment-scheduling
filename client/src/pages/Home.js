import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(!localStorage.authorization_token) {
            setIsLoggedIn(true);
            navigate('/login');
        }
    }, [])

    return (
        <div>Home</div>
    )
}

export default Home;