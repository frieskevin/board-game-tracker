import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import GameList from '../components/GameList';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER, { variables: { username: userParam } });
    const user = data?.user || [];
    return (
        <main>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h3>{user.username}'s Games</h3>
                        <GameList
                            games={user.games}
                            title=''
                        />
                    </div>
                )}
            </div>
        </main>
    );
};

export default Profile;