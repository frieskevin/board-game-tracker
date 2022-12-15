import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

export const ADD_GAME = gql`
    mutation addGame($title: String!, $username: String!, $winner: String, $score: String, $gameNotes: String, $image: String, $link: String) {
        addGame(title: $title, username: $username, winner: $winner, score: $score, gameNotes: $gameNotes, image: $image, link: $link) {
            _id
            title
            username
            winner
            score
            gameNotes
            image
            link
        }
    }`

export const DELETE_GAME = gql`
    mutation deleteGame($gameId: String!) {
        deleteGame(gameId: $gameId) {
            _id
            title
    }
}`;

export const ADD_COMMENT = gql`
    mutation addComment($gameId: ID!, $commentBody: String!) {
        addComment(gameId: $gameId, commentBody: $commentBody) {
            _id
            gameId
            commentBody
    }
}`;