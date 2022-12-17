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
                width: '18rem'
              }}>
              <CardTitle>{game.title}</CardTitle>
              <p>
                <CardLink
                  to={`/profile/${game.username}`}
                >
                  {game.username}
                </CardLink>{' '}
              </p>
              <div>
                <Link to={`/game/${game._id}`}>
                  <ListGroup flush>
                    <ListGroupItem>
                      <CardText>
                        {game.gameNotes}
                        </CardText>
                        </ListGroupItem>
                    <ListGroupItem>
                      {game.winner}
                    </ListGroupItem>
                    <ListGroupItem>
                      {game.score}
                    </ListGroupItem>
                    <ListGroupItem>
                      {game.username}
                    </ListGroupItem>
                  </ListGroup>
                  <p className="mb-0">
                    Comments: {game.commentCount} || Click to{' '}
                    {game.commentCount ? 'see' : 'start'} the discussion!
                  </p>
                </Link>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default GameList;