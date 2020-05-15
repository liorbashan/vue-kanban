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
        TASK_DETAILS_UPDATE: function(state, payload) {
            let updatedTask = state.tasks.find((x) => {
                return x.id === payload.id;
            });
            updatedTask.title = payload.title;
            updatedTask.description = payload.description;
            updatedTask.tags = payload.tags;
            updatedTask.user = payload.user;
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
        UPDATE_TASK_DETAILS: async ({ commit }, payload) => {
            let data = null;
            EventBus.$emit('SHOW_LOADER', 1);
            const result = await apollo
                .mutate({
                    mutation: taskGQL.editTask,
                    variables: {
                        taskId: payload.taskId,
                        taskTitle: payload.taskTitle,
                        taskDesc: payload.taskDesc,
                        tagId: payload.tagId,
                        userId: payload.userId,
                    },
                })
                .catch((error) => {
                    console.log(error);
                    EventBus.$emit('HIDE_LOADER', 1);
                    throw error;
                });
            if (result) {
                data = result.data.updateTask;
                if (data.numUids === 1) {
                    commit('TASK_DETAILS_UPDATE', data.task[0]);
                }
            }
            EventBus.$emit('HIDE_LOADER', 1);
            return data;
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
        GET_TASK_BY_ID: (state) => (id) => {
            return state.tasks.find((item) => {
                return item.id === id;
            });
        },
    },
};
