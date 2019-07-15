import * as React from 'react';
import { ApolloLink, Observable } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { ApolloCache } from 'apollo-cache';
import { ApolloProviderProps, ApolloProvider } from 'react-apollo';

export const createApolloLoadingProvider = (
  apolloCache: ApolloCache<any>,
  provider?: React.ComponentType<ApolloProviderProps<any>>
) => ({ children }: { children: React.ReactChild | JSX.Element }) => {
  const link = new ApolloLink(() => {
    return new Observable(() => {});
  });

  const client = new ApolloClient({
    link,
    cache: apolloCache,
  });

  const Provider = provider ? provider : ApolloProvider;
  return <Provider client={client}>{children}</Provider>;
};
