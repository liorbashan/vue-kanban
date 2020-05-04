import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './modules/tasks';
import tags from './modules/tags';
import projects from './modules/projects';
import epics from './modules/epics';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tags,
        projects,
        epics,
        tasks,
        users,
    },
});
