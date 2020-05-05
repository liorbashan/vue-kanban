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
        TASK_STATUS_CHANGE: (state, updatedTask) => {
            let task = state.tasks.find((x) => {
                return x.id === updatedTask.id;
            });
            task.status = updatedTask.status;
        },
    },
    actions: {
        LIST_ALL_EPIC_TASKS: async ({ commit }, epicId) => {
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
        ADD_NEW_TASK: async ({ commit }, payload) => {
            let data = null;
            EventBus.$emit('SHOW_LOADER', 1);
            debugger;
            const result = await apollo
                .mutate({
                    mutation: taskGQL.createNewTask,
                    variables: {
                        taskTitle: payload.taskTitle,
                        taskDesc: payload.taskDesc,
                        tagId: payload.tagId,
                        epicId: payload.epicId,
                        time: new Date(),
                        userId: payload.userId,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                data = result.data.addTask.task;
                commit('ADD_NEW_TASK', data);
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
        },
        UPDATE_TASK_STATUS: async ({ commit }, payload) => {
            let data = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: taskGQL.changeTaskStatus,
                    variables: {
                        status: payload.newStatus,
                        taskId: payload.taskId,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                if (result.data.updateTask.numUids === 1) {
                    data = result.data.updateTask.task[0];
                    commit('TASK_STATUS_CHANGE', data);
                }
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return result;
        },
        DELETE_TASKS: async ({ commit }, idToDeleteArr) => {
            let data = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: taskGQL.deleteTasksById,
                    variables: {
                        idToDeleteArr,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            if (result) {
                data = result.data.deleteTask;
                if (data.numUids === idToDeleteArr.length) {
                    commit('DELETE_TASK', idToDeleteArr);
                }
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
