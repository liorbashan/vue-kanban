import apollo from '../../apolloClient';
import epicGQL from '../../gql/epics.gql';
import { EventBus } from '@/eventBus';
const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        epics: [],
    },
    mutations: {
        SET_EPICS: function(state, epics) {
            state.epics = epics;
        },
        ADD_NEW_EPIC: function(state, newEpic) {
            state.epics = [...state.epics, ...newEpic];
        },
        DELETE_EPIC: function(state, epicId) {
            _.remove(state.epics, (item) => {
                return item.id === epicId;
            });
        },
        UPDATE_EPIC: function(state, payload) {
            let updatedEpic = state.epics.find((x) => {
                return x.id === payload.id;
            });
            updatedEpic.description = payload.description;
        },
    },
    actions: {
        FETCH_ALL_EPICS: async function({ commit }, projectId) {
            const result = await apollo
                .query({
                    query: epicGQL.getProjectEpics,
                    variables: {
                        projectId,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                commit('SET_EPICS', result.data.queryProject[0].epics);
            }
            return result.data.queryProject[0].epics;
        },
        ADD_NEW_EPIC: async function({ commit }, payload) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: epicGQL.createNewEpic,
                    variables: {
                        name: payload.name,
                        desc: payload.desc,
                        projectId: payload.projectId,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('ADD_NEW_EPIC', result.data.addEpic.epic);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
        DELETE_EPIC: async function({ commit }, idToDelete) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: epicGQL.deleteEpicById,
                    variables: {
                        idToDelete,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('DELETE_EPIC', idToDelete);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
        UPDATE_EPIC: async function({ commit }, payload) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: epicGQL.editEpic,
                    variables: {
                        epicId: payload.epicId,
                        desc: payload.desc,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('UPDATE_EPIC', result.data.updateEpic.epic[0]);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
    },
    getters: {
        GET_ALL_PROJECT_EPICS: (state) => (id) => {
            return state.epics.filter((x) => {
                return x.project.id === id;
            });
        },
        GET_EPIC_BY_ID: (state) => (id) => {
            return state.epics.find((item) => {
                return item.id === id;
            });
        },
    },
};
