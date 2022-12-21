import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GAMES } from '../utils/queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameList from '../components/GameList';
import { Spinner } from 'reactstrap';

const Home = () => {
    const { loading, data } = useQuery(QUERY_GAMES);
    const games = data?.games || [];
    return (
        <main>
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
