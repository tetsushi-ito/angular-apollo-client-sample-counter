import gql from 'graphql-tag';

export const defaults = {
  counter: {
    current: 0,
    __typename: 'Counter',
  },
};

export const resolvers = {
  Mutation: {
    increment: (_, args, { cache }) => {

      const query = gql`
        query {
          counter {
            current
          }
        }
      `;

      const prev = cache.readQuery({ query });

      const current = prev.counter.current + 1;

      const data = {
        counter: {
          current,
          __typename: 'Counter'
        }
      };

      cache.writeData({ data });

      return current;
    },
    decrement: (_, args, { cache }) => {

      const query = gql`
        query {
          counter {
            current
          }
        }
      `;

      const prev = cache.readQuery({ query });

      const current = prev.counter.current - 1;

      const data = {
        counter: {
          current,
          __typename: 'Counter'
        }
      };

      cache.writeData({ data });

      return current;
    },
  }
};
