<template>
    <v-app id="inspire">
      <Header/>
        <v-content>
            <v-container class="pa-0 white align-start" fill-height fluid>
              <router-view />
            </v-container>
        </v-content>
        <Footer/>
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
    created () {
      this.$vuetify.theme.dark = true
    },
};
</script>

<style scoped>
</style>
