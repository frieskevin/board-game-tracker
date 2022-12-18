import React from 'react';
//import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from '../utils/queries';
import Auth from '../utils/auth';
//import Dashboard from '../pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpModal from '../components/Modal/SignUpModal';
import LoginModal from '../components/Modal/LoginModal';
import GameList from '../components/GameList';
import { Spinner } from 'reactstrap';

const Home = () => {
    const { loading, data } = useQuery(QUERY_GAMES);
    const games = data?.games || [];
    console.log(games, 'games');
    return (
        <main>
            {Auth.loggedIn() ? (
                <></>
            ) : (
                <>
                    <SignUpModal />
                    <LoginModal />
                </>
            )}
            <div>
                {loading ? (
                    <Spinner color='primary'>Loading...</Spinner>
                ) : (
                    <GameList
                        games={games}
                        title="EVERY GAME EVER PLAYED EVER"
                    />
                )}
            </div>
        </main>
    );
};



export default Home;
