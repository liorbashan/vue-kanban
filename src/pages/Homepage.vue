<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <h1 class="black--text">{{ applicationName }} Projects:</h1>
                <h3>Amount of Projects: {{ numOfProjects }}</h3>
            </v-col>
            <v-col align="right" col="2">
                <v-btn @click="openCreateForm()" color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
                <!-- <v-btn @click="refreshList()" color="secondary" fab small depressed>
                    <v-icon dark>refresh</v-icon>
                </v-btn>-->
            </v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row class="justify-center">
            <v-col v-if="projectsList" flex class="d-flex flex-wrap justify-center" xl="8">
                <v-card class="projectCard" color="#e8fcff" v-for="(item, index) in projectsList" :key="index">
                    <v-card-title class="headline">
                        {{ item.name }}
                        <span class="caption ml-2">({{ item.id }})</span>
                    </v-card-title>
                    <v-card-subtitle class="subtitle black--text font-weight-regular subtitle-1">{{ item.description }}</v-card-subtitle>
                    <v-card-actions class="action d-flex justify-space-between">
                        <router-link :to="{ name: 'Projectpage', params: { id: item.id, name: item.name } }">
                            <v-btn color="secondary" depressed>View Epics</v-btn>
                        </router-link>
                        <div class="btn-wrapper">
                            <v-btn @click="editProject(item.id)" fab depressed outlined color="grey darken-4" small>
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn @click="confirmDeletion(item.id)" fab depressed outlined color="grey darken-4" small>
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <div class="empty-list-message" v-if="projectsList.length === 0">
            <h2>There are no Projects</h2>
            <h4>But the good news is you get to create the first one (;</h4>
        </div>
        <v-dialog v-model="formModal" persistent max-width="550">
            <ProjectForm v-if="formModal" :project="projToEdit" @closed="formModal = false"></ProjectForm>
        </v-dialog>
        <ConfirmBox :message="confirmBox.message" v-if="confirmBox.show" @close="getConfirmBoxValue"></ConfirmBox>
    </v-container>
</template>

<script>
import ProjectForm from '../components/ProjectForm.vue';
import ConfirmBox from '../components/ConfirmBox';
import { EventBus } from '../eventBus';
import { mapGetters } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Homepage',
    components: { ProjectForm, ConfirmBox },
    data() {
        return {
            formModal: false,
            projToEdit: null,
            applicationName: process.env.VUE_APP_APPLICATION_NAME || '',
            confirmBox: {
                show: false,
                message: null,
                payload: null,
            },
        };
    },
    created() {},
    computed: {
        ...mapGetters({
            projectsList: ['projects/GET_ALL_PROJECTS'],
            numOfProjects: ['projects/GET_PROJECT_COUNT'],
        }),
    },
    methods: {
        openCreateForm() {
            this.projToEdit = null;
            this.formModal = true;
        },
        async editProject(id) {
            this.projToEdit = await this.$store.getters['projects/GET_PROJECT_BY_ID'](id);
            this.formModal = true;
        },
        async getConfirmBoxValue(confirmed) {
            this.confirmBox.show = false;
            if (confirmed) {
                await this.deleteProject(this.confirmBox.payload).catch((error) => {
                    EventBus.$emit('SHOW_ERROR', error);
                    console.log(error);
                });
            }
            this.resetConfirmBox();
        },
        confirmDeletion(id) {
            const proj = this.$store.getters['projects/GET_PROJECT_BY_ID'](id);
            if (!proj) {
                EventBus.$emit('SHOW_ERROR', 'The project you are trying to delete seem to be missing, please try to refresh page to get the update projects list');
            } else {
                this.confirmBox.message = `Are you sure you wish to delete project ${proj.name}?`;
                this.confirmBox.payload = id;
                this.confirmBox.show = true;
            }
        },
        async deleteProject(id) {
            const res = await this.$store.dispatch('projects/DELETE_PROJECT', id).catch((error) => {
                console.log(error);
                EventBus.$emit('SHOW_ERROR', error);
            });
            if (res) {
                EventBus.$emit('SHOW_SUCCESS', `Project Deleted!`);
            }
        },
        resetConfirmBox() {
            this.confirmBox.message = null;
            this.confirmBox.payload = null;
        },
    },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
    max-width: 1050px;
    // border-bottom: 1px solid #e1e1e1;
}
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