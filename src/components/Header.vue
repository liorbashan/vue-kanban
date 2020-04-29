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
                        <v-list-item-title class="title">Upper Funnel</v-list-item-title>
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
                            <v-btn class="white--text" depressed color="transparent" tile>{{item.text}}</v-btn>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar dense app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <router-link class="white--text" to="/">
                <v-btn depressed fab text><v-icon>home</v-icon></v-btn>
            </router-link>
            <v-toolbar-title>Upper Funnel Kanban</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
import { EventBus } from '@/eventBus';
export default {
    name: 'Homepage',
    data() {
        return {
            drawer: false,
            menuItems: [
                { text: 'Home', icon: 'home', link: '/' },
                { text: 'Tags', icon: 'local_offer', link: '/tags' },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
a {
    color: #fff;
}
</style>