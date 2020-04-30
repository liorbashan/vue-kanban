<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row class="header-wrapper justify-center ma-auto">
            <v-col align="left" col="2">
                <v-btn @click="$router.back()" color="secondary" depressed>
                    <v-icon left dark>arrow_back_ios</v-icon>back
                </v-btn>
            </v-col>
            <v-col align="center" col="4">
                <h1 class="black--text">
                    Board:
                    <span class="primary--text display-1">{{name}}</span>
                    <span class="caption">({{id}})</span>
                </h1>
            </v-col>
            <v-col align="right" col="2">
                <v-btn @click="openCreateModal()" color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-divider light></v-divider>
        <v-row v-if="tasksList" class="justify-center align-strech mt-3">
            <v-col class="lane" v-for="lane in board" :key="lane.title">
                <p class="lane-title">{{lane.title}}</p>
                <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                <draggable
                    :list="lane.tasks"
                    :animation="200"
                    ghost-class="ghost-card"
                    group="tasks"
                >
                    <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                    <TaskCard
                        v-for="(task) in lane.tasks"
                        :key="task.id"
                        :task="task"
                        class="mt-3 cursor-move"
                    ></TaskCard>
                    <!-- </transition-group> -->
                </draggable>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import TaskCard from '../components/TaskCard';
import store from '../store';
export default {
    name: 'Epicpage',
    props: ['id', 'name'],
    components: {
        TaskCard,
        draggable,
    },
    data() {
        return {};
    },
    async created() {
        await this.$store.dispatch('tasks/LIST_ALL_EPIC_TASKS', this.id);
    },
    computed: {
        board() {
            return [
                { title: 'Backlog', tasks: this.backlog },
                { title: 'In Progress', tasks: this.inProgress },
                { title: 'Review', tasks: this.review },
                { title: 'Done', tasks: this.done },
            ];
        },
        tasksList() {
            const list = store.getters['tasks/GET_EPIC_TASKS'](this.id);
            return list ? list : [];
        },
        backlog() {
            const retVal = this.tasksList.filter((item) => {
                return item.status === 'Backlog';
            });
            return retVal;
        },
        inProgress() {
            const retVal = this.tasksList.filter((item) => {
                return item.status === 'InProgress';
            });
            return retVal;
        },
        review() {
            const retVal = this.tasksList.filter((item) => {
                return item.status === 'Review';
            });
            return retVal;
        },
        done() {
            const retVal = this.tasksList.filter((item) => {
                return item.status === 'Done';
            });
            return retVal;
        },
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.column-width {
    min-width: 320px;
    width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
    opacity: 0.5;
    background: #f7fafc;
    border: 1px solid #4299e1;
}
.lane {
    background-color: #f7fafc;
    min-width: 320px;
    width: 320px;
    padding: .75rem;
    border-radius: .5rem;
    margin: 0 4px;
    max-width: 400px;
    .lane-title{
        color: #4e4444;
        font-weight: 800;
        font-size: 24px;

    }
}
</style>