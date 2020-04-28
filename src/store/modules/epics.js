import apollo from '../../apolloClient';
import epicGQL from '../../gql/epics.gql';
import { EventBus } from '@/eventBus';
const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        epicss: [],
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
            // TODO: set data ---- updatedEpic.description = payload.description;
        },
    },
    actions: {
        FETCH_ALL_EPICS: async function({ commit }, projId) {
            const result = await apollo
                .query({
                    query: epicGQL.getProjectEpics,
                    variables: {
                        projId,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            commit('SET_EPICS', result.data.queryProject.epics);
        },
    },
    getters: {
        GET_ALL_EPICS: (state) => {
            return state.epics;
        },
        GET_EPIC_BY_ID: (state) => (id) => {
            return state.epics.find((item) => {
                return item.id === id;
            });
        },
    },
};
