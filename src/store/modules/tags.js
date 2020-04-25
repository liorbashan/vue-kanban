// import gql from 'graphql-tag';

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
        getAllTags({ commit }) {
            const tags = this.apollo.getAllTags;
            commit('addTags', tags);
        },
    },
    getters: {
        getTags(state) {
            return state.tags;
        },
    },
    // apollo: {
    //     getAllTags: gql`queryTag {
    //         id
    //         title
    //         color
    //       }`,
    // },
};
