//const { AuthenticationError } = require('apollo-server-express');
//const { signToken } = require('../utils/auth');

//import models here
const { User } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
              .select('-__v -password')
          },
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
          },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
    }

}

module.exports = resolvers;