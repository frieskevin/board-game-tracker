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
    username: String!
    winner: String
    score: String
    gameLength: Number
    gameNotes: String
    characters: [Characters]
    image: String
    link: String

  }
  type Characters {
    _id: ID
    character: String!
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
    addGame(title: String!, username: String! winner: String, score: String, gameLength: Number, gameNotes: String, image: String, link: String): User
    deleteGame(gameId: String!): User
    addCharacter(gameId: String!, character: String!): Game
    deleteCharacter(gameId: String!, character: String!): Game
  }

`;

  module.exports = typeDefs;