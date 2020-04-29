<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <h1 class="black--text">{{name}}</h1>
                <h3>Epics:</h3>
            </v-col>
            <v-col align="right" col="2">
                <v-btn @click="openCreateModal()" color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row class="justify-center">
            <v-col flex class="d-flex flex-wrap justify-center" xl="8">
                <v-card
                    class="epicCard"
                    color="#e8fcff"
                    v-for="(item, index) in epicsList"
                    :key="index"
                >
                    <v-card-title class="headline">
                        {{item.name}}
                        <span class="caption ml-2">({{item.id}})</span>
                    </v-card-title>
                    <v-card-subtitle
                        class="subtitle black--text font-weight-regular subtitle-1"
                    >{{item.description}}</v-card-subtitle>
                    <v-card-actions class="action d-flex justify-space-between">
                        <router-link :to="{name:'Projectpage',params:{id:item.id, name:item.name}}">
                            <v-btn color="secondary" depressed>View Board</v-btn>
                        </router-link>
                        <div class="btn-wrapper">
                            <v-btn
                                @click="editEpic(item.id)"
                                fab
                                depressed
                                outlined
                                color="grey darken-4"
                                small
                            >
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn
                                @click="deleteEpic(item.id)"
                                fab
                                depressed
                                outlined
                                color="grey darken-4"
                                small
                            >
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="formModal" persistent max-width="550">
            <EpicForm v-if="formModal" :projectId="id" :epic="epicToEdit" @closed="closeForm()"></EpicForm>
        </v-dialog>
    </v-container>
</template>

<script>
import EpicForm from '../components/EpicForm';
export default {
    name: 'Projectpage',
    components: { EpicForm },
    props: ['id', 'name'],
    data() {
        return {
            epicsList: null,
            formModal: false,
            epicToEdit: null,
        };
    },
    created() {
        this.getProjectEpics();
    },
    methods: {
        async closeForm() {
            this.epicsList = await this.$store.getters['epics/GET_ALL_PROJECT_EPICS'](this.id);
            this.formModal = false;
        },
        async getProjectEpics() {
            this.epicsList = await this.$store.dispatch('epics/FETCH_ALL_EPICS', this.id);
        },
        async openCreateModal() {
            this.epicToEdit = null;
            this.formModal = true;
        },
        async editEpic(id) {
            this.epicToEdit = await this.$store.getters['epics/GET_EPIC_BY_ID'](id);
            this.formModal = true;
        },
        async deleteEpic(id) {},
    },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
    max-width: 1050px;
}
.epicCard {
    border: 1px solid #989898 !important;
    width: 100%;
    max-width: 350px;
    margin: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &:hover {
        background: rgb(255, 254, 213) !important;
    }
    .headline {
        text-transform: capitalize;
    }
    .headline,
    .subtitle,
    .action {
        font-family: inherit !important;
    }
    .btn-wrapper {
        display: flex;
        flex-direction: row;
        width: 33%;
        justify-content: space-between;
    }
}
</style>