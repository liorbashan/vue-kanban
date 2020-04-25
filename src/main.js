import Vue from 'vue';
import App from './App.vue';
import './assets/css/tailwind.css';
import router from './router';
import store from './store';
import apollo from './apolloClient';

Vue.config.productionTip = false;
Vue.prototype.$apollo = apollo;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
