const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const { User, Game, Characters } = require('../models');

const resolvers = {
    Query: {
        // Gets data of logged in user
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                   .select('-__v -password')
                   .populate('games');

                    return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // Gets data of all users
        users: async () => {
            return await User.find()
                .select('-__v -password')
                .populate('games')
        },
        // Gets data of one user by username
        user: async (parent, { username }) => {
            return await User.findOne({ username })
                .select('-__v -password')
                .populate('games')
        },
        // Gets data of all games
        games: async (parent, { username }) => {
            const params = username ? { username } : {};
            return await Game.find(params).sort({ createdAt: -1 });
        },
        // Gets data of one game by id
        game: async (parent, { _id }) => {
            return await Game.findOne({ _id });
        }
    },

    Mutation: {
        // Adds user to database
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
        // Logs user in
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
        // Adds game to database
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
        // Deletes one game by the game's id
        deleteGame: async (parent, args, context) => {
            if(context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { games: args._id }},
                    { new: true }
                );
                const removeGame = await Game.deleteOne(
                    { _id: args._id}
                )
                return updateUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        // Adds comment to game with logged in user name
        addComment: async (parent, { gameId, commentBody }, context) => {
            if (context.user) {
                const comment = await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );
                return comment;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
      
    }
}


module.exports = resolvers;