import React from 'react';
import { Navigate } from 'react-router-dom';
//import { useQuery } from '@apollo/client';
//import { QUERY_GAMES } from '../utils/queries';
//import GameList from '../components/GameList';
import Auth from '../utils/auth';
//import SignUpModal from '../components/Modal/SignUpModal';
//import LoginModal from '../components/Modal/LoginModal';
//import Dashboard from '../pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpModal from '../components/Modal/SignUpModal';
import LoginModal from '../components/Modal/LoginModal';

const Home = () => {
    const loggedIn = Auth.loggedIn();
    if(loggedIn) {
        return (
            <Navigate to="/dashboard" />
        );
    } else {
    
    return (
        <main>
            <SignUpModal />
            <LoginModal />
        </main>
    );
};
};


export default Home;
