import * as React from 'react';
import { ApolloLink, Observable } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { GraphQLError } from 'graphql';
import { ApolloCache } from 'apollo-cache';
import { ApolloProviderProps, ApolloProvider } from 'react-apollo';

export const createApolloErrorProvider = (
  apolloCache: ApolloCache<any>,
  provider?: React.ComponentType<ApolloProviderProps<any>>
) => ({
  graphQLErrors,
  children,
}: {
  graphQLErrors: GraphQLError[];
  children: React.ReactChild | JSX.Element;
}) => {
  // This is just a link that swallows all operations and returns the same thing
  // for every request: The specified error.
  const link = new ApolloLink(() => {
    return new Observable(observer => {
      observer.next({
        errors: graphQLErrors || [
          { message: 'Unspecified error from ErrorProvider.' },
        ],
      });
      observer.complete();
    });
  }) as any;

  const client = new ApolloClient({
    link,
    cache: apolloCache,
  });

  const Provider = provider ? provider : ApolloProvider;
  return <Provider client={client}>{children}</Provider>;
};
