<template>
    <v-container justify="center" class="white pa-2" fluid>
      <v-row class="justify-center">
            <v-col align="center" col="2">
                <h1 class="black--text">project.name</h1>
                <h3>Epics:</h3>
            </v-col>
            <v-col align="center" col="2">
                <v-btn color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <button type="button" @click="test()">click</button>
    </v-container>
</template>

<script>
export default {
    name: 'Projectpage',
    props: ['id'],
    data() {
        return {
            project: null,
        };
    },
    mounted() {
        this.project = this.$store.getters['projects/GET_PROJECT_BY_ID'](this.id);
    },
    computed: {
        epicList: function() {
            return this.$store.dispatch('epics/FETCH_ALL_EPICS', this.id);
        },
    },
    methods:{
      test(){
        this.$router.push('/')
      }
    }
};
</script>

<style lang="scss" scoped>
</style>