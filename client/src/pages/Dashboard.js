import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import GameList from '../components/GameList';
import Auth from '../utils/auth';
import AddGameModal from '../components/Modal/AddGameModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, { variables: { username: userParam}});
    const loggedIn = Auth.loggedIn();
    const me = data?.me || [];
    console.log(me);
  
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
                        games={me.games}
                        title="Games Played"
                    />
                )}
            </div>
        </main>
    );
};

export default Dashboard;