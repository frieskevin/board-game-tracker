import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroup,
  CardLink,
  Card,
  CardBody,
} from 'reactstrap';


const GameList = ({ games, title }) => {
  if (!games.length) {
    return <h3>No games yet</h3>
  }

  return (
    <div>
      {games &&
        games.map(game => (
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
                    Game Notes: </span>{game.gameNotes}
                  </CardText>
                  <CardText><span className='font'>
                    Winner: </span>{game.winner}
                  </CardText>
                  <CardText><span className='font'>
                    Score: </span>{game.score}
                  </CardText>
                  <p className="comments mb-0"><span className='font'>
                    Comments: </span>{game.commentCount} || Click to{' '}
                    {game.commentCount ? 'see' : 'start'} the discussion!
                  </p>
                </Link>
              </div>
            </CardBody>
          </Card >
        ))}
    </div >
  );
};

export default GameList;