<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <v-btn @click="$router.back()" color="secondary" depressed> <v-icon left dark>arrow_back_ios</v-icon>back </v-btn>
            </v-col>
            <v-col align="center" col="4">
                <h1 class="black--text">
                    Project:
                    <span class="primary--text display-1">{{ name }}</span>
                    <span class="caption">({{ id }})</span>
                </h1>
                <h3>Amount of Epics: {{ numOfEpics }}</h3>
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
            <v-col v-if="epicsList" flex class="d-flex flex-wrap justify-center" xl="8">
                <v-card class="epicCard" color="#e8fcff" v-for="(item, index) in epicsList" :key="index">
                    <v-card-title class="headline">
                        {{ item.name }}
                        <span class="caption ml-2">({{ item.id }})</span>
                    </v-card-title>
                    <v-card-subtitle class="subtitle black--text font-weight-regular subtitle-1">{{ item.description }}</v-card-subtitle>
                    <v-card-actions class="action d-flex justify-space-between">
                        <router-link :to="{ name: 'Epicpage', params: { id: item.id, name: item.name } }">
                            <v-btn color="secondary" depressed>View Board</v-btn>
                        </router-link>
                        <div class="btn-wrapper">
                            <v-btn @click="editEpic(item.id)" fab depressed outlined color="grey darken-4" small>
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
        <div class="empty-list-message" v-if="epicsList.length === 0">
            <h2>There are no Epics</h2>
            <h4>But the good news is you get to create the first one (;</h4>
        </div>
        <v-dialog v-model="formModal" persistent max-width="550">
            <EpicForm v-if="formModal" :projectId="id" :epic="epicToEdit" @closed="closeForm()"></EpicForm>
        </v-dialog>
        <ConfirmBox :message="confirmBox.message" v-if="confirmBox.show" @close="getConfirmBoxValue"></ConfirmBox>
    </v-container>
</template>

<script>
import EpicForm from '../components/EpicForm';
import { EventBus } from '../eventBus';
import ConfirmBox from '../components/ConfirmBox';
import store from '../store';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Projectpage',
    components: { EpicForm, ConfirmBox },
    props: ['id', 'name'],
    data() {
        return {
            // epicsList: [],
            formModal: false,
            epicToEdit: null,
            confirmBox: {
                show: false,
                message: null,
                payload: null,
            },
        };
    },
    async created() {
        await this.$store.dispatch('epics/FETCH_ALL_EPICS', this.id);
    },
    computed: {
        epicsList() {
            // return store.getters['tasks/GET_ALL_PROJECT_EPICS'](this.id);
            const list = store.getters['epics/GET_ALL_PROJECT_EPICS'](this.id);
            return list ? list : [];
        },
        numOfEpics() {
            return this.epicsList.length ? this.epicsList.length : 0;
        },
    },
    methods: {
        async closeForm() {
            this.formModal = false;
        },
        async openCreateModal() {
            this.epicToEdit = null;
            this.formModal = true;
        },
        async editEpic(id) {
            this.epicToEdit = await this.$store.getters['epics/GET_EPIC_BY_ID'](id);
            this.formModal = true;
        },
        confirmDeletion(id) {
            const epic = this.$store.getters['epics/GET_EPIC_BY_ID'](id);
            if (!epic) {
                EventBus.$emit('SHOW_ERROR', 'The epic you are trying to delete seem to be missing, please try to refresh page to get the update epics list');
            } else {
                this.confirmBox.message = `Are you sure you wish to delete epic ${epic.name}?`;
                this.confirmBox.payload = id;
                this.confirmBox.show = true;
            }
        },
        async getConfirmBoxValue(confirmed) {
            this.confirmBox.show = false;
            if (confirmed) {
                const deleteResult = await this.deleteEpic(this.confirmBox.payload);
                if (deleteResult) {
                    EventBus.$emit('SHOW_SUCCESS', 'Epic Deleted Successfully');
                    await this.$store.dispatch('epics/FETCH_ALL_EPICS', this.id).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error);
                        console.log(error);
                    });
                }
            }
            this.confirmBox.message = null;
            this.confirmBox.payload = null;
        },
        async deleteEpic(id) {
            const deleteResult = await this.$store.dispatch('epics/DELETE_EPIC', [id]).catch((error) => {
                EventBus.$emit('SHOW_ERROR', error);
                throw error;
            });
            return deleteResult ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
    max-width: 1050px;
    .display-1,
    .display-2,
    .caption,
    .title,
    .subtitle-1,
    .subtitle-2 {
        font-family: 'Baloo Tamma 2', cursive !important;
    }
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
.v-btn {
    &:hover {
        .v-icon--left {
            width: 28px;
        }
    }
}
</style>