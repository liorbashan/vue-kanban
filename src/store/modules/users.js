import apollo from '../../apolloClient';
import userskGQL from '../../gql/users.gql';
import { EventBus } from '@/eventBus';
const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        users: [],
    },
    mutations: {
        SET_USERS: (state, users) => {
            state.users = users;
        },
        ADD_NEW_USER: function(state, newUser) {
            state.users = [...state.users, ...newUser];
        },
        DELETE_USER: function(state, userIdArr) {
            _.remove(state.users, (item) => {
                return userIdArr.includes(item.id);
            });
        },
        UPDATE_USER: function(state, payload) {
            let updatedUser = state.users.find((x) => {
                return x.id === payload.id;
            });
            updatedUser.fname = payload.fname;
        },
    },
    getters: {
        GET_ALL_USERS: (state) => {
            return state.users;
        },
        GET_USER: (state) => (userId) => {
            return state.users.filter((item) => {
                return item.id === userId;
            });
        },
    },
    actions: {
        FETCH_ALL_USERS: async ({ commit }) => {
            let data = [];
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .query({
                    query: userskGQL.getAllUsers,
                    fetchPolicy: 'no-cache',
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                data = result.data.queryUser;
                commit('SET_USERS', data);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
        ADD_NEW_USER: async ({ commit }, payload) => {
            let data = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: userskGQL.addNewUser,
                    variables: {
                        emali: payload.email,
                        fname: payload.fname,
                        lname: payload.lname,
                        avatarUrl: payload.avatarUrl,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                data = result.data.addUser.user;
                commit('ADD_NEW_USER', data);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
        DELETE_USERS: async ({ commit }, idsToDelete) => {
            let data = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: userskGQL.deleteUser,
                    variables: {
                        idsToDelete,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                data = result.data.deleteUser;
                if (data.numUids === idsToDelete.length) {
                    commit('DELETE_USER', idsToDelete);
                }
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
    },
};
