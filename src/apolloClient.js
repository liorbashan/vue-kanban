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
    uri: 'https://kanban-db.us-west-2.aws.cloud.dgraph.io/graphql',
    defaultOptions,
    cache: null,
});
