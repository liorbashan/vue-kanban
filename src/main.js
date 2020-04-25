import Vue from 'vue';
import App from './App.vue';
import './assets/css/tailwind.css';
import router from './router';
import store from './store';
import apollo from './apolloClient';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$apollo = apollo;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
