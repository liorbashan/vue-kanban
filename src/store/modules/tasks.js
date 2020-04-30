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
        SET_TASKS: function(state, tasks) {
            this.state.tasks = tasks;
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
    actions: {},
    getters: {},
};
