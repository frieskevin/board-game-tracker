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
          <div key={game.id}>
            
            <Card
            style={{
              display: 'flex',
              flexDirection: 'row',
              mb:'3',
              sm: '8'
          }}>
              <CardBody className='card-body'>
              <CardTitle className='text-center h4'>{game.title}</CardTitle>
                <p>
                  <CardLink
                    className='profile-link'
                    to={`/profile/${game.username}`}
                  >
                    Created By: {game.username}
                  </CardLink>{' '}
                </p>
                <div className='card-main'>
                  <Link to={`/game/${game._id}`}>
                    <CardText>
                      Game Notes: {game.gameNotes}
                    </CardText>
                    <CardText>
                      Winner: {game.winner}
                    </CardText>
                    <CardText>
                      Score: {game.score}
                    </CardText>
                    <p className="comments mb-0">
                      Comments: {game.commentCount} || Click to{' '}
                      {game.commentCount ? 'see' : 'start'} the discussion!
                    </p>
                  </Link>
                </div>
              </CardBody>
            </Card >
            </div>
        ))}
    </div >
  );
};

export default GameList;