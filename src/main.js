import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apollo from './apolloClient';
import vuetify from './plugins/vuetify';
// Import the plugin here
import { Auth0Plugin } from './auth';

const authDomain = process.env.VUE_APP_AUTH_DOMAIN;
const authClientId = process.env.VUE_APP_AUTH_CLIENT_ID;
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
    domain: authDomain,
    clientId: authClientId,
    onRedirectCallback: (appState) => {
        router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
    },
});

Vue.config.productionTip = false;
Vue.prototype.$apollo = apollo;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
