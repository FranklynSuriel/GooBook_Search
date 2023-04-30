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
    mutation Login($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }  
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            bookCount
            email
            password
            username
            saveBooks {
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

export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: Int!) {
        removeBook(bookId: $bookId) {
            _id
            bookCount
            email
            password
            username
            saveBooks {
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