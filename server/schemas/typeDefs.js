const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        username: String
        email: String
        password: String
        saveBooks: [Books]
    }

    type Books {
        author: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        user: [User]
        books: [Books]
    }
`;

module.exports = typeDefs;