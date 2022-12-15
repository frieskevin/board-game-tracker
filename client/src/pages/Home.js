import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from '../utils/queries';
import GameList from '../components/GameList';
import Auth from '../utils/auth';

const Home = () => {
    const { loading, data } = useQuery(QUERY_GAMES);
    const loggedIn = Auth.loggedIn();
    const games = data?.games || [];

    return (
        <main>
            <div className=''>
                {loggedIn && (
                    <button className=''>
                        Create Game
                    </button>
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

export default Home;
