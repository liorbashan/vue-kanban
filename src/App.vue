<template>
    <v-app id="inspire">
        <!-- HEADER START -->
        <Header />
        <!-- HEADER END -->
        <v-content>
            <v-container class="pa-0 white align-start" fill-height fluid>
                <router-view />
            </v-container>
        </v-content>
        <!-- FOOTER START -->
        <Footer />
        <!-- FOOTER END -->
        <!-- Globals: -->
        <v-dialog v-model="error.show" persistent width="500">
            <v-card>
                <v-card-title class="headline red lighten-2" primary-title>Error!</v-card-title>
                <v-card-text class="my-8">
                    <h3>{{error.message}}</h3>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" depressed @click="error.show=false">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="success.show" persistent width="500">
            <v-card>
                <v-card-title class="headline green lighten-2" primary-title>Success!</v-card-title>
                <v-card-text class="my-8">
                    <h3>{{success.message}}</h3>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" depressed @click="success.show=false">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay z-index="9999" :value="loader.show">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-app>
</template>

<script>
import { EventBus } from './eventBus';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import Footer from './components/Footer';
export default {
    name: 'App',
    components: { Header, Footer },
    data() {
        return {
            drawer: false,
            error: {
                show: false,
                message: '',
            },
            success: {
                show: false,
                message: '',
            },
            loader: {
                counter: 0,
                show: false,
            },
        };
    },
    created() {
        this.$vuetify.theme.dark = true;
        this.initData();
        this.initEventHandlers();
    },
    methods: {
        initData: function() {
            this.$store.dispatch('tags/getAllTags');
            this.$store.dispatch('projects/FETCH_ALL_PROJECTS');
        },
        initEventHandlers: function() {
            EventBus.$on('SHOW_ERROR', (payload) => {
                this.error.message = payload;
                this.error.show = true;
            });
            EventBus.$on('SHOW_SUCCESS', (payload) => {
                this.success.message = payload;
                this.success.show = true;
            });
            EventBus.$on('SHOW_LOADER', (payload) => {
                if (payload) {
                    this.loader.counter += payload;
                }
                this.loader.show = true;
            });
            EventBus.$on('HIDE_LOADER', (payload) => {
                if (payload) {
                    this.loader.counter -= payload;
                    if (this.loader.counter < 1) {
                        this.loader.counter = 0;
                        this.loader.show = false;
                    }
                } else {
                    this.loader.counter = 0;
                    this.loader.show = false;
                }
            });
        },
    },
};
</script>

<style>
body {
    font-family: 'Baloo Tamma 2', cursive;
}
.v-application .headline,
div#inspire {
    font-family: 'Baloo Tamma 2', cursive;
    color: #000;
}
#confirmTitle {
    font-family: 'Baloo Tamma 2', cursive !important;
    color: #fff !important;
}
a {
    text-decoration: none;
}
</style>
