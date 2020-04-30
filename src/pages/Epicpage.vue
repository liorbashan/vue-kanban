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
        <v-row v-if="tasksList" class="justify-center align-strech">
            <div color="#e8fcff" v-for="(item, index) in tasksList" :key="index">
                <span>{{item.id}}</span>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable';
import TaskCard from '../components/TaskCard.vue';
import store from '../store';
export default {
    name: 'Epicpage',
    props: ['id', 'name'],
    // components: {
    //     TaskCard,
    //     draggable,
    // },
    data() {
        return {
            qaTag: {},
            columns: [
                {
                    title: 'Backlog',
                    tasks: [
                        {
                            id: 1,
                            title: 'Add discount code to checkout page',
                            date: 'Sep 14',
                            type: 'Feature Request',
                        },
                        {
                            id: 2,
                            title: 'Provide documentation on integrations',
                            date: 'Sep 12',
                        },
                        {
                            id: 3,
                            title: 'Design shopping cart dropdown',
                            date: 'Sep 9',
                            type: 'Design',
                        },
                        {
                            id: 4,
                            title: 'Add discount code to checkout page',
                            date: 'Sep 14',
                            type: 'Feature Request',
                        },
                        {
                            id: 5,
                            title: 'Test checkout flow',
                            date: 'Sep 15',
                            type: 'QA',
                        },
                    ],
                },
                {
                    title: 'In Progress',
                    tasks: [
                        {
                            id: 6,
                            title: 'Design shopping cart dropdown',
                            date: 'Sep 9',
                            type: 'Design',
                        },
                        {
                            id: 7,
                            title: 'Add discount code to checkout page',
                            date: 'Sep 14',
                            type: 'Feature Request',
                        },
                        {
                            id: 8,
                            title: 'Provide documentation on integrations',
                            date: 'Sep 12',
                            type: 'Backend',
                        },
                    ],
                },
                {
                    title: 'Review',
                    tasks: [
                        {
                            id: 9,
                            title: 'Provide documentation on integrations',
                            date: 'Sep 12',
                        },
                        {
                            id: 10,
                            title: 'Design shopping cart dropdown',
                            date: 'Sep 9',
                            type: 'Design',
                        },
                        {
                            id: 11,
                            title: 'Add discount code to checkout page',
                            date: 'Sep 14',
                            type: 'Feature Request',
                        },
                        {
                            id: 12,
                            title: 'Design shopping cart dropdown',
                            date: 'Sep 9',
                            type: 'Design',
                        },
                        {
                            id: 13,
                            title: 'Add discount code to checkout page',
                            date: 'Sep 14',
                            type: 'Feature Request',
                        },
                    ],
                },
                {
                    title: 'Done',
                    tasks: [
                        {
                            id: 14,
                            title: 'Add discount code to checkout page',
                            date: 'Sep 14',
                            type: 'Feature Request',
                        },
                        {
                            id: 15,
                            title: 'Design shopping cart dropdown',
                            date: 'Sep 9',
                            type: 'Design',
                        },
                        {
                            id: 16,
                            title: 'Add discount code to checkout page',
                            date: 'Sep 14',
                            type: 'Feature Request',
                        },
                    ],
                },
            ],
        };
    },
    async created() {
        await this.$store.dispatch('tasks/LIST_ALL_EPIC_TASKS', this.id);
    },
    computed: {
        tasksList() {
            const list = store.getters['tasks/GET_EPIC_TASKS'](this.id);
            return list ? list : [];
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
</style>