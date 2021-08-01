const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("savedBooks");
    },
    getSingleUser: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedBooks");
    },
  },
  Mutation: {
    createUser: async (parent, { body }) => {
      return User.create(body);
    },
  },
};

module.exports = resolvers;
