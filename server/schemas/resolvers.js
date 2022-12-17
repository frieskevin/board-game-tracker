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
                   .populate('games');

                    return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('games')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('games')
        },
        games: async () => {
            return Game.find();
        },
        game: async (parent, { _id }) => {
            return Game.findOne({ _id });
        }
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
        addComment: async (parent, { gameId, commentBody }, context) => {
            if (context.user) {
                const comment = await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );
                console.log(comment, "resolvers line 92");
                return comment;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
      
    }
}


module.exports = resolvers;