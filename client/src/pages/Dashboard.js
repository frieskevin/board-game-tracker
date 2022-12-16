import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from '../utils/queries';
import GameList from '../components/GameList';
import Auth from '../utils/auth';
import AddGameModal from '../components/Modal/AddGameModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_GAMES);
    const loggedIn = Auth.loggedIn();
    const games = data?.games || [];

  
    return (
        <main>
            <div className=''>
                {loggedIn && (
                     <AddGameModal /> 
                )}
            </div>
            <div className={`${loggedIn && ''}`}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <GameList
                        games={games}
                        title="Games Played"
                    />
                )}
            </div>
        </main>
    );
};

export default Dashboard;