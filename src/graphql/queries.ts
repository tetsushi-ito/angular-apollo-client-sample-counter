import gql from 'graphql-tag';

export const getCurrentCounter = gql`
  query {
    counter @client {
      current
    }
  }
`;
