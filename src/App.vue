<template>
    <v-app id="inspire">
        <Header />
        <v-content>
            <v-container class="pa-0 white align-start" fill-height fluid>
                <router-view />
            </v-container>
        </v-content>
        <Footer />
    </v-app>
</template>

<script>
import Homepage from './pages/Homepage';
import Header from './components/Header';
import Footer from './components/Footer';
export default {
    name: 'App',
    components: { Header, Footer },
    data() {
        return {
            drawer: false,
        };
    },
    created() {
        this.$vuetify.theme.dark = true;
        this.initData();
    },
    methods: {
        initData: function() {
            this.$store.dispatch('tags/getAllTags');
        },
    },
};
</script>

<style>
body {
    font-family: 'Baloo Tamma 2', cursive;
}
div#inspire{
  font-family: 'Baloo Tamma 2', cursive;
  color: #000;
}
</style>
