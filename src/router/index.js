import Vue from 'vue';
import { authGuard } from '../auth/authGuard';
import Router from 'vue-router';
import Profile from '../views/Profile';
import Homepage from '../pages/Homepage';
import Tagspage from '../pages/Tagspage';
import Epicpage from '../pages/Epicpage';
import Projectpage from '../pages/Projectpage';
import Userpage from '../pages/Userpage';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            components: {
                default: Homepage,
            },
        },
        {
            path: '/tags',
            name: 'Tagspage',
            component: Tagspage,
            beforeEnter: authGuard,
        },
        {
            path: '/users',
            name: 'Userpage',
            component: Userpage,
            beforeEnter: authGuard,
        },
        {
            path: '/project/:id/:name',
            name: 'Projectpage',
            component: Projectpage,
            props: true,
        },
        {
            path: '/epic/:id/:name',
            name: 'Epicpage',
            component: Epicpage,
            props: true,
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            beforeEnter: authGuard,
        },
    ],
});
