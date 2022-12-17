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
  query games {
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
}`;

export const QUERY_GAME = gql`
    query game($id: ID) {
        game(_id: $id) {
            _id
            title
            username
            winner
            score
            gameNotes
            createdAt
            comments {
                _id
                commentBody
                username
                createdAt
            }
            image
            link
    
        }
    }`;

