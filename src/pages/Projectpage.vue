<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="justify-center">
            <v-col align="center" col="2">
                <h1 class="black--text">{{name}}</h1>
                <h3>Epics:</h3>
            </v-col>
            <v-col align="center" col="2">
                <v-btn color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Projectpage',
    props: ['id', 'name'],
    data() {
        return {
            epicsList: null,
        };
    },
    created() {
        //this.epicsList = this.$store.dispatch('epics/FETCH_ALL_EPICS', this.id);
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
</style>