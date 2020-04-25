import Vue from 'vue';
import Vuex from 'vuex';
import usersModule from './modules/users';
import tagsModule from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users: usersModule,
        tags: tagsModule,
    },
});
