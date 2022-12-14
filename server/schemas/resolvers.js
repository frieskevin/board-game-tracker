const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//import models here
const { User, Game, Characters } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                   .select('-__v -password')
                    .populate('characters')
                   .populate('games');

                    return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('games')
                .populate('characters');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('games')
                .populate('characters');
        },
        games: async () => {
            return Game.findOne({ _id });
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },

        addGame: async (parent, args, context) => {
            if (context.user) {
                const game = await Game.create({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { games: game._id } },
                    { new: true }
                );
                return game;
            }
            throw new AuthenticationError("You need to be logged in!");

        },
        deleteGame: async (parent, args, context) => {
            if(context.user) {
                const updatedGame = await Game.create({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { games: game._id } },
                    { new: true }
                );
                return updatedGame;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addCharacter: async (parent, { gameId, character }) => {
            if (context.user) {
                const character = await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $addToSet: { characters: { character } } },
                    { new: true, runValidators: true }
                )
                return character;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteCharacter: async (parent, { gameId, character }) => {
            if (context.user) {
                const updatedCharacter = await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $pull: { characters: { character } } },
                    { new: true }
                )
                return updatedCharacter;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    }
}


module.exports = resolvers;