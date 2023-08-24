import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: `https://acatzingo.stepzen.net/api/kindly-toad/__graphql`,
    headers: {
        // stepzen woami apikey or check dashboard
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
    },
    cache: new InMemoryCache(),
});

export default client;