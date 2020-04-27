import apollo from '../../apolloClient';
import tagGQL from '../../gql/tags.gql';
import { EventBus } from '@/eventBus';
const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        tags: [],
    },
    mutations: {
        SET_TAGS(state, tags) {
            state.tags = tags;
        },
        ADD_NEW_TAG(state, newTags) {
            state.tags = [...state.tags, ...newTags];
        },
        DELETE_TAG: function(state, tagId) {
            _.remove(state.tags, (item) => {
                return item.id === tagId;
            });
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
            commit('SET_TAGS', tags.data.queryTag);
        },

        async addNewTag({ commit }, newTags) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: tagGQL.addNewTag,
                    variables: {
                        newTags,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('ADD_NEW_TAG', result.data.addTag.tag);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },

        async deleteTag({ commit }, tagIdToDelete) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: tagGQL.deleteTag,
                    variables: {
                        tagToDelete: { id: [tagIdToDelete] },
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('DELETE_TAG', tagIdToDelete);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
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
