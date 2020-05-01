<template>
    <div>
        <div class="card-wrapper">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon color="grey" v-on="on">
                        <v-icon left>settings</v-icon>
                    </v-btn>
                </template>
                <v-list light>
                    <v-list-item @click="editTask(task.id)">
                        <v-icon class="mr-2">edit</v-icon>
                        <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="confirmDeletion(task.id)">
                        <v-icon class="mr-2">delete</v-icon>
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <span class="caption font-weight-thin">{{task.id}}</span>
            <div class="card-header">
                <p class="card-title">{{task.title}}</p>
                <img
                    class="w-6 h-6 rounded-full ml-3"
                    src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
                    alt="Avatar"
                />
            </div>
            <div class="card-footer flex mt-4 justify-between items-center">
                <span
                    class="body-2 font-italic grey--text"
                >{{task.createdDate | dateFormat(task.createdDate) }}</span>
                <badge :color="task.tags.color">{{task.tags.title}}</badge>
            </div>
        </div>
        <!-- TASK FORM MODAL -->
        <v-dialog v-model="formModal" persistent max-width="550">
            <TaskForm
                v-if="formModal"
                :epicId="task.epic.id"
                :task="task"
                @closed="formModal = false"
            ></TaskForm>
        </v-dialog>
        <ConfirmBox
            :message="confirmBox.message"
            v-if="confirmBox.show"
            @close="getConfirmBoxValue"
        ></ConfirmBox>
    </div>
</template>
<script>
import TaskForm from '../components/TaskForm';
import Badge from './Badge.vue';
import ConfirmBox from '../components/ConfirmBox';
import { EventBus } from '../eventBus';
export default {
    name: 'TaskCard',
    components: {
        Badge,
        TaskForm,
        ConfirmBox,
    },
    props: {
        task: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            formModal: false,
            confirmBox: {
                show: false,
                message: null,
                payload: null,
            },
        };
    },
    computed: {
        badgeColor() {
            const mappings = {
                Design: 'purple',
                'Feature Request': 'teal',
                Backend: 'blue',
                QA: 'green',
                default: 'teal',
            };
            return mappings[this.task.type] || mappings.default;
        },
    },
    filters: {
        dateFormat(date) {
            let d = new Date(date);
            let datestring =
                ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
            return datestring;
        },
    },
    methods: {
        editTask() {
            this.formModal = true;
        },
        confirmDeletion(id) {
            this.confirmBox.message = `Are you sure you wish to delete task ${this.task.title}?`;
            this.confirmBox.payload = id;
            this.confirmBox.show = true;
        },
        async getConfirmBoxValue(confirmed) {
            this.confirmBox.show = false;
            if (confirmed) {
                const deleteResult = await this.deleteTask(this.confirmBox.payload).catch((error) => {
                    EventBus.$emit('SHOW_ERROR', error);
                });
                if (deleteResult) {
                    await this.$store.dispatch('tasks/LIST_ALL_EPIC_TASKS', this.task.epic.id);
                    EventBus.$emit('SHOW_SUCCESS', 'Task Deleted!');
                }
            }
            this.confirmBox.message = null;
            this.confirmBox.payload = null;
        },
        async deleteTask() {
            const deleteResult = await this.$store.dispatch('tasks/DELETE_TASKS', [this.confirmBox.payload]).catch((error) => {
                throw error;
            });
            return deleteResult ? true : false;
        },
    },
};
</script>
<style lang="scss" scoped>
.card-wrapper {
    background-color: #fff;
    border: 1px solid #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.25rem;
    padding: 0.25rem 0.75rem 0.75rem 0.75rem;
    cursor: move;
    .caption {
        font-family: 'Baloo Tamma 2', cursive !important;
        font-size: 10px !important;
    }
    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        .card-title {
            font-weight: 500;
            margin: 0;
            font-size: 20px;
            text-transform: capitalize;
        }
        .card-desc {
            font-weight: 400px;
        }
        img {
            border-radius: 9999px;
            margin-left: 12px;
            width: 32px;
            height: 32px;
            align-self: baseline;
        }
    }
    .card-footer {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: baseline;
    }
}
</style>