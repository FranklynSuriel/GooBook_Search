import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }  
        }
    }
`;

export const SAVEDBOOK = gql`
    mutation savedBook($bookData: BookInput!) {
        savedBook(bookData: $bookData) {
            _id
            bookCount
            email
            password
            username
            savedBook {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;

export const REMOVEBOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            bookCount
            email
            password
            username
            savedBook {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;