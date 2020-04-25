import apollo from '../../apolloClient';
import getAllTagsQuery from '../../gql/tags.graphql';

export default {
    namespaced: true,
    state: {
        tags: [],
    },
    mutations: {
        addTags(state, tags) {
            state.tags = tags;
        },
    },
    actions: {
        async getAllTags({ commit }) {
            console.log(getAllTagsQuery);
            const tags = await apollo
                .query({
                    query: getAllTagsQuery,
                })
                .catch((error) => {
                    console.log(error);
                });
            commit('addTags', tags.data.queryTag);
        },
    },
    getters: {
        getTags: (state) => {
            return state.tags;
        },
        getTag: (state) => (tagName) => {
            return state.tags.find((item) => {
                return item.title === tagName;
            });
        },
    },
};
