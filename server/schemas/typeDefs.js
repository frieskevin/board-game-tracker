const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    games: [Game]

  }
  type Game {
    _id: ID
    title: String!
    username: String
    winner: String
    score: String
    gameNotes: String
    comments: [Comment]
    createdAt: String
    image: String
    link: String

  }
  type Comment {
    _id: ID
    commentBody: String
    username: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(username: String): User
    games(username: String): [Game]
    game(_id: ID!): Game
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGame(title: String!, username: String! winner: String, score: String, gameNotes: String, image: String, link: String, createdAt: String): Game
    deleteGame(gameId: String!): User
    addComment(gameId: ID!, commentBody: String!): Game
   }
`;

  module.exports = typeDefs;