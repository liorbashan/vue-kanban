<template>
    <div>
        <v-navigation-drawer v-model="drawer" temporary dark app clipped>
            <v-list>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon>home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <router-link class="white--text" to="/">Kanban</router-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon>local_offer</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <router-link class="white--text" to="/tags">Tags</router-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar dense app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Upper Funnel Kanban</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'Homepage',
    data() {
        return {
            drawer: false,
        };
    },
};
</script>

<style lang="scss" scoped>
a {
    color: #fff;
}
</style>