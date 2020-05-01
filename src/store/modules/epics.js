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
        SET_EPICS: (state, epics) => {
            state.epics = [];
            state.epics = epics;
        },
        ADD_NEW_EPIC: function(state, newEpic) {
            state.epics = [...state.epics, ...newEpic];
        },
        DELETE_EPIC: function(state, epicArr) {
            _.remove(state.epics, (item) => {
                return epicArr.includes(item.id);
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
            let data = null;
            const result = await apollo
                .query({
                    query: epicGQL.getProjectEpics,
                    variables: {
                        projectId,
                    },
                    fetchPolicy: 'no-cache',
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                data = result.data.queryProject[0].epics;
                commit('SET_EPICS', data);
            }
            return data;
        },
        ADD_NEW_EPIC: async function({ commit }, payload) {
            EventBus.$emit('SHOW_LOADER', 1);
            let data = null;
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
                data = result.data.addEpic.epic;
                commit('ADD_NEW_EPIC', data);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
        DELETE_EPIC: async ({ commit }, idArr) => {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: epicGQL.deleteEpicById,
                    variables: {
                        idArr,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('DELETE_EPIC', idArr);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
        UPDATE_EPIC: async function({ commit }, payload) {
            EventBus.$emit('SHOW_LOADER', 1);
            let data = null;
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
                data = result.data.updateEpic.epic[0];
                commit('UPDATE_EPIC', data);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
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
        GET_NUM_OF_EPICS: (state) => {
            return state.epics.length;
        },
    },
};
