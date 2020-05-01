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
                <v-btn @click="formModal=true" color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
            </v-col>
            <!-- TASK FORM MODAL -->
            <v-dialog v-model="formModal" persistent max-width="550">
                <TaskForm v-if="formModal" :epicId="id" :task="null" @closed="formModal = false"></TaskForm>
            </v-dialog>
        </v-row>
        <v-divider light></v-divider>
        <v-row v-if="tasksList" class="justify-center align-strech mt-3">
            <v-col :id="lane.title" class="lane" v-for="lane in board" :key="lane.title">
                <p class="lane-title">{{lane.title}}</p>
                <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
                <draggable
                    :component-data="getComponentData()"
                    :v-model="lane.tasks"
                    :animation="200"
                    ghost-class="ghost-card"
                    group="tasks"
                >
                    <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                    <TaskCard
                        v-for="(task) in lane.tasks"
                        :key="task.id"
                        :id="task.id"
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
import TaskForm from '../components/TaskForm';
import store from '../store';
export default {
    name: 'Epicpage',
    props: ['id', 'name'],
    components: {
        TaskCard,
        draggable,
        TaskForm,
    },
    data() {
        return {
            formModal: false,
        };
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
            return this.tasksList.filter((item) => {
                return item.status === 'Backlog';
            });
        },
        inProgress() {
            return this.tasksList.filter((item) => {
                return item.status === 'InProgress';
            });
        },
        review() {
            return this.tasksList.filter((item) => {
                return item.status === 'Review';
            });
        },
        done() {
            return this.tasksList.filter((item) => {
                return item.status === 'Done';
            });
        },
    },
    methods: {
        getComponentData() {
            return {
                on: {
                    // change: this.handleChange,
                    // input: this.inputChanged,
                    // end: this.ended,
                    add: this.draggableAdded,
                },
            };
        },
        handleChange(element) {
            console.log('changed', element);
        },
        inputChanged(value) {
            console.log(value);
        },
        ended(element) {
            // console.log('dropped', element);
        },
        draggableAdded(element) {
            const payload = {
                taskId: element.item.id,
                newStatus: element.to.parentElement.id.replace(/\s/g, ''), // Remove white space in status name (In Progress)
            };
            this.updateTaskStatus(payload);
        },
        async updateTaskStatus(payload) {
            const updateStatusResult = await this.$store.dispatch('tasks/UPDATE_TASK_STATUS', payload);
        },
    },
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
    background-color: #e6f5ff;
    min-width: 320px;
    width: 320px;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin: 4px;
    max-width: 400px;
    min-height: 1000px;
    .lane-title {
        color: #4e4444;
        font-weight: 800;
        font-size: 24px;
    }
}
</style>