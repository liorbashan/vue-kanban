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
    uri: process.env.VUE_APP_GRAPHQL_URL,
    defaultOptions,
    cache: null,
});
