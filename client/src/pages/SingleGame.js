import React from 'react';
import { useParams } from 'react-router-dom';

import {
    Button,
    CardTitle,
    CardText,
    ListGroupItem,
    ListGroup,
    CardLink,
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

    console.log(game);
    return (
        <div>
            <Card>
                <CardTitle tag="h5" className='m-0'>
                    {game.title}
                </CardTitle>
                <CardBody>
                    <CardText ><span className='font'>Notes: </span>
                        {game.gameNotes}
                    </CardText>
                    <CardText className='text-center'><span className='font'>
                        Players: </span>{game.players}
                    </CardText>
                    <div className='card-main'>
                        <CardText className='text-center'><span className='font'>
                            Winner: </span>{game.winner}
                        </CardText>
                        <CardText className='text-center'><span className='font'>
                            Score: </span>{game.score}
                        </CardText>
                    </div>
                </CardBody>
                <ListGroup flush>
                    <ListGroupItem>
                        {game.username}
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