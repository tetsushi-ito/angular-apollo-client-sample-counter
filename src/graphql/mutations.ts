import gql from 'graphql-tag';

export const increment = gql`
  mutation increment {
    increment @client
  }
`;

export const decrement = gql`
  mutation decrement {
    decrement @client
  }
`;
