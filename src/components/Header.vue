<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <div>
        <v-navigation-drawer v-model="drawer" temporary dark app clipped>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="../assets/logo-white.png"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="title">{{ applicationName }}</v-list-item-title>
                        <v-list-item-subtitle>888</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list nav>
                <v-list-item ripple link v-for="(item, i) in menuItems" :key="i">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <router-link class="white--text" :to="item.link">
                            <v-btn class="white--text" depressed color="transparent" tile>{{ item.text }}</v-btn>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar dense app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <router-link class="white--text" to="/">
                <v-btn depressed fab text>
                    <v-icon>home</v-icon>
                </v-btn>
            </router-link>
            <v-toolbar-title>{{ applicationName }} Kanban</v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="!$auth.loading">
                <!-- show login when not authenticated -->
                <v-btn depressed text v-if="!$auth.isAuthenticated" @click="login">
                    Login
                    <v-icon>login</v-icon>
                </v-btn>
                <!-- show logout when authenticated -->
                <router-link v-if="$auth.isAuthenticated" class="white--text" to="/profile">
                    <v-btn depressed fab text>
                        <img class="userIcon" :src="$auth.user.picture" />
                    </v-btn>
                </router-link>
                <v-btn depressed text v-if="$auth.isAuthenticated" @click="logout">Log out</v-btn>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
import { EventBus } from '@/eventBus';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Homepage',
    data() {
        return {
            drawer: false,
            applicationName: process.env.VUE_APP_APPLICATION_NAME || '',
            menuItems: [
                { text: 'Home', icon: 'home', link: '/' },
                { text: 'Tags', icon: 'local_offer', link: '/tags' },
                { text: 'Users', icon: 'group', link: '/users' },
            ],
        };
    },
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        // Log the user out
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
$iconSize: 32px;
a {
    color: #fff;
}
.userIcon {
    max-width: 100%;
    width: $iconSize;
    height: $iconSize;
    border-radius: $iconSize;
}
</style>