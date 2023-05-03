const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // me: async (parent, { user }) => {
        //     if (!user) {
        //         throw new AuthenticationError('Not logged in');
        //     }

        //     const foundUser = User.findOne({ _id: user.id }).populate('savedBook');
        //     return foundUser;
        // },
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = User.findOne({ _id: context.user._id }).select('__v -password');
                return foundUser;                
            }
            throw new AuthenticationError('Not logged in');

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
                throw new AuthenticationError('Wrong username or password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {

            const  { authors, description, bookId, image, link, title } = bookData;
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
                
            }
            throw new AuthenticationError('You need to be logged in');

        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
    
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');

        },
    },
}

module.exports = resolvers;