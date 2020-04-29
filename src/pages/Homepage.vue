<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="justify-center">
            <v-col align="center" col="2">
                <h1 class="black--text">Upper Funnel Projects:</h1>
            </v-col>
            <v-col align="center" col="2">
                <v-btn @click="openCreateForm()" color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
                <!-- <v-btn @click="refreshList()" color="secondary" fab small depressed>
                    <v-icon dark>refresh</v-icon>
                </v-btn>-->
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-col flex class="d-flex flex-wrap justify-center" xl="8">
                <v-card
                    class="projectCard"
                    color="#e8fcff"
                    v-for="(item, index) in projectsList"
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
                            <v-btn color="secondary" depressed>View Epics</v-btn>
                        </router-link>
                        <div class="btn-wrapper">
                            <v-btn
                                @click="editProject(item.id)"
                                fab
                                depressed
                                outlined
                                color="grey darken-4"
                                small
                            >
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn
                                @click="deleteProject(item.id)"
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
            <ProjectForm v-if="formModal" :project="projToEdit" @closed="formModal = false"></ProjectForm>
        </v-dialog>
    </v-container>
</template>

<script>
import ProjectForm from '../components/ProjectForm.vue';
import { EventBus } from '../eventBus';
export default {
    name: 'Homepage',
    components: { ProjectForm },
    data() {
        return {
            formModal: false,
            projToEdit: null,
        };
    },
    created() {},
    computed: {
        projectsList: function() {
            return this.$store.getters['projects/GET_ALL_PROJECTS'];
        },
    },
    methods: {
        refreshList() {
            this.$store.dispatch('projects/FETCH_ALL_PROJECTS');
        },
        openCreateForm() {
            this.projToEdit = null;
            this.formModal = true;
        },
        async editProject(id) {
            this.projToEdit = await this.$store.getters['projects/GET_PROJECT_BY_ID'](id);
            this.formModal = true;
        },
        async deleteProject(id) {
            const proj = this.$store.getters['projects/GET_PROJECT_BY_ID'](id);
            if (!proj) {
                EventBus.$emit('SHOW_ERROR', 'The project you are trying to delete seem to be missing, please try to refresh page to get the update projects list');
            } else {
                await EventBus.$emit('SHOW_CONFIRM', `Are you sure you wish to delete project ${proj.name}?`, 'projects/DELETE_PROJECT', id, 'projects/FETCH_ALL_PROJECTS');
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.projectCard {
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