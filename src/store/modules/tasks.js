import apollo from '../../apolloClient';
import taskGQL from '../../gql/tasks.gql';
import { EventBus } from '@/eventBus';
import store from '../index';
const _ = require('lodash');

export default {
    namespaced: true,
    state: {
        tasks: [],
    },
    mutations: {
        SET_TASKS: (state, tasks) => {
            state.tasks = tasks;
        },
        ADD_NEW_TASK: function(state, newTask) {
            state.tasks = [...state.tasks, ...newTask];
        },
        DELETE_TASK: function(state, taskIdArr) {
            _.remove(state.tasks, (item) => {
                return taskIdArr.includes(item.id);
            });
        },
        UPDATE_TASK: function(state, payload) {
            let updatedTask = state.task.find((x) => {
                return x.id === payload.id;
            });
            // updatedTask.xx = payload.xx;
        },
    },
    actions: {
        LIST_ALL_EPIC_TASKS: async function({ commit }, epicId) {
            let data = [];
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .query({
                    query: taskGQL.getEpicTasks,
                    variables: {
                        epicId,
                    },
                    fetchPolicy: 'no-cache',
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                data = result.data.queryEpic[0].tasks;
                commit('SET_TASKS', data);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
    },
    getters: {
        GET_EPIC_TASKS: (state) => (epicId) => {
            return state.tasks.filter((item) => {
                return item.epic.id === epicId;
            });
        },
    },
};
