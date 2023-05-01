const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { user }) => {
            if (!user) {
                throw new AuthenticationError('Not logged in');
            }

            const foundUser = User.findOne({ _id: user.id }).populate('savedBook');
            return foundUser;
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ $or: [{ username: email }, { email }] });
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPwd = await user.isCorrectPassword(password);

            if (!correctPwd) {
                throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, { user }) => {
            if (!user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
            ).populate('savedBooks');

            return updatedUser;
        },
        removeBook: async (parent, { bookId }, { user }) => {
            if (!user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            ).populate('savedBooks');

            return updatedUser;
        },
    },
}

module.exports = resolvers;