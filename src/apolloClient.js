import ApolloClient from 'apollo-boost';
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
    },
    query: {
        fetchPolicy: 'no-cache',
    },
};
export default new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    defaultOptions,
    cache: null,
});
