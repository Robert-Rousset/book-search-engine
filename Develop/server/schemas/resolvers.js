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
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    createUser: async (parent, { body }) => {
      return User.create(body);
    },
    login: async (parent, { body }) => {
      return User.findOne({ email: body.email }, { password: body.password });
    },
    saveBook: async (parent, { body }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
    },
  },
};

module.exports = resolvers;
