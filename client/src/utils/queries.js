import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBook {
            bookId
            authors
            description
            title
            image
            link
            }
        }
    }
`;