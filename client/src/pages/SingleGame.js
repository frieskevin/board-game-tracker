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
        return <div>Loading...</div>;
    }
    
    console.log(game);
    return (
        <div>
            <Card
                style={{
                    width: '18rem'
                }}>
                <CardBody>
                    <CardTitle tag="h5">
                        { game.title}
                    </CardTitle>
                    <CardText>
                        { game.gameNotes}
                    </CardText>
                </CardBody>
                <ListGroup flush>
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
                <CardBody>
                </CardBody>
            </Card>
            {Auth.loggedIn()}
        </div>
    );
};

export default SingleGame;