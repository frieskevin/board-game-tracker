import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      games {
        _id
        title
        username
        winner
        score
        gameNotes
        createdAt
        comments {
            commentBody
            username
            createdAt
        }
        image
        link
      }
    }
}`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      name
      email
    }
}`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        games {
          _id
          title
          username
          winner
          score
          gameNotes
          createdAt
          comments {
            commentBody
            username
            createdAt
          }
        }
    }
}`;

export const QUERY_GAMES = gql`
  query games($username: String!) {
    games(username: $username) {
        _id
        title
        username
        winner
        score
        gameNotes
        createdAt
        comments {
            commentBody
            username
            createdAt
        }
        image
        link
    }
}`;

export const QUERY_GAME = gql`
    query game($_id: ID) {
        game(_id: $_id) {
            _id
            title
            username
            winner
            score
            gameNotes
            createdAt
            comments {
                commentBody
                username
                createdAt
            }
            image
            link
    
        }
    }`;

