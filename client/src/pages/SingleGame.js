import React from 'react';
import { useParams, Link } from 'react-router-dom';

import {
    CardTitle,
    CardText,
    ListGroupItem,
    ListGroup,
    Card,
    CardBody,
    Spinner
} from 'reactstrap';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_GAME } from '../utils/queries';

const SingleGame = (props) => {
    const { id: gameId } = useParams();
    const { loading, data } = useQuery(QUERY_GAME, {
        variables: { id: gameId }
    })
    const game = data?.game || {};

    if (loading) {
        return <Spinner color='primary'>Loading...</Spinner>;
    }
    // This page displays one single game with the option to add comments
    return (
        <div>
            <Card className='single-game'>
                <CardTitle tag="h5" className='m-0'>
                    {game.title}
                </CardTitle>
                <CardBody>
                    <CardText className='text-center'>
                        <span className='font'>Created On: </span>
                        {game.createdAt}
                    </CardText>
                    <CardText className='text-center'>
                        <span className='font'>Players: </span>
                        {game.players}
                    </CardText>
                    <CardText className='text-center'>
                        <span className='font'>Winner: </span>
                        {game.winner}
                    </CardText>
                    <CardText className='text-center'>
                        <span className='font'>Score: </span>
                        {game.score}
                    </CardText>
                    <CardText className='text-center'>
                        <span className='font'>Notes: </span>
                        {game.gameNotes}
                    </CardText>
                </CardBody>
                <ListGroup flush>
                    <ListGroupItem>
                        <Link to={`/profile/${game.username}`} className='profile-link'>
                        {game.username}
                        </Link>
                    </ListGroupItem>
                </ListGroup>
                <CommentList comments={game.comments} />
                {Auth.loggedIn() && <CommentForm gameId={game._id} />}
                <CardBody>
                </CardBody>
            </Card>
            {Auth.loggedIn()}
        </div>
    );
};

export default SingleGame;