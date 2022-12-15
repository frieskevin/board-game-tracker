import React from 'react';
import { Link } from 'react-router-dom';

const GameList = ({ games, title }) => {
    if (!games.length) {
        return <h3>No games yet</h3>
    }

return (
    <div>
        <h3>{title}</h3>
        {games && 
            games.map(game => (
                <div key={game.id}>
                    <p>
                        <Link
                        to={`/profile/${game.username}`}
                        >
                            {game.username}
                        </Link>{' '}
                    </p>
                    <div>
              <Link to={`/game/${game._id}`}>
                <p>{game.gameNotes}</p>
                <p>{game.winner}</p>
                <p>{game.score}</p>
                <p className="mb-0">
                  Comments: {game.commentCount} || Click to{' '}
                  {game.commentCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GameList;