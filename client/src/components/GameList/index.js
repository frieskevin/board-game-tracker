import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_GAME } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  CardTitle,
  CardText,
  Card,
  CardBody,
} from 'reactstrap';



const GameList = ({ games, title }) => {
  const [deleteGame] = useMutation(DELETE_GAME);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const location = useLocation();
  
 
  if (!games.length) {
    return <h3>No games yet</h3>
  }

  
  // deletes game from database
  const handleDeleteGame = async (_id) => {
    console.log('I was hit  GameList')
    if (!token) {
        return false;
    }

    try {
        await deleteGame({
            variables: { _id: _id },
            
        });
    } catch (err) {
        console.log(err);
    }
    window.location.reload();
};

  return (
    <div>
      {games &&
        games?.map(game => (
          <Card
            key={game._id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              mb: '3',
              sm: '8'
            }}>
            <CardBody className='card-body'>
              <CardTitle className='text-center h4'>{game.title}</CardTitle>
              <p>
                <Link
                  className='profile-link'
                  to={`/profile/${game.username}`}
                ><span className='font'>Created By: </span>
                  {game.username}
                </Link>{' '}
              </p>
              <div className='card-main'>
                <Link to={`/game/${game._id}`}>
                  <CardText><span className='font'>
                    Players: </span>{game.players}
                  </CardText>
                  <CardText><span className='font'>
                    Winner: </span>{game.winner}
                  </CardText>
                  <p className="comments mb-0"><span className='font'>
                    Comments: </span>{game.commentCount} || Click to{' '}
                    {game.commentCount ? 'see' : 'start'} the discussion!
                  </p>
                </Link>
                {Auth.loggedIn() && location.pathname === '/Dashboard' &&
                <Button onClick={() => handleDeleteGame(game._id)} type="button" color='danger' id='deleteBtn'>
                  <span className='font'>X</span>
                </Button>}
              </div>
            </CardBody>
          </Card >
        ))}
    </div >
  );
};

export default GameList;