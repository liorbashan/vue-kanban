import Vue from 'vue';
import Vuex from 'vuex';
// import usersModule from './modules/users';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tags,
    },
});
