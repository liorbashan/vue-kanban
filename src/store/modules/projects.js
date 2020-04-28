import apollo from '../../apolloClient';
import projectGQL from '../../gql/projects.gql';
import { EventBus } from '@/eventBus';
const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        projects: [],
    },
    mutations: {
        SET_PROJECTS: function(state, projects) {
            state.projects = projects;
        },
        ADD_NEW_PROJECT: function(state, newProject) {
            state.projects = [...state.projects, ...newProject];
        },
        DELETE_PROJECT: function(state, projId) {
            _.remove(state.projects, (item) => {
                return item.id === projId;
            });
        },
        UPDATE_PROJECT: function(state, payload) {
            let updatedProj = state.projects.find((x) => {
                return x.id === payload.id;
            });
            updatedProj.description = payload.description;
        },
    },
    actions: {
        FETCH_ALL_PROJECTS: async function({ commit }) {
            const project = await apollo
                .query({
                    query: projectGQL.getAllProjects,
                })
                .catch((error) => {
                    console.log(error);
                });
            commit('SET_PROJECTS', project.data.queryProject);
        },
        ADD_NEW_PROJECT: async function({ commit }, payload) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: projectGQL.addNewProject,
                    variables: {
                        projectName: payload.name,
                        projectDesc: payload.desc,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('ADD_NEW_PROJECT', result.data.addProject.project);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
        DELETE_PROJECT: async function({ commit }, idToDelete) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: projectGQL.deleteProject,
                    variables: {
                        idToDelete,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('DELETE_PROJECT', idToDelete);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
        UPDATE_PROJECT: async function({ commit }, payload) {
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: projectGQL.editProject,
                    variables: {
                        id: payload.id,
                        projectDesc: payload.description,
                    },
                })
                .catch((error) => {
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                commit('UPDATE_PROJECT', payload);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
    },
    getters: {
        GET_ALL_PROJECTS: (state) => {
            return state.projects;
        },
        GET_PROJECT_BY_ID: (state) => (id) => {
            return state.projects.find((item) => {
                return item.id === id;
            });
        },
    },
};
