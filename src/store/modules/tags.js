import apollo from '../../apolloClient';
import tagGQL from '../../gql/tags.gql';

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
            const tags = await apollo
                .query({
                    query: tagGQL.getAllTagsQuery,
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
