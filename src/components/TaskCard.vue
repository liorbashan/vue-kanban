<template>
    <div>
        <div class="card-wrapper">
            <div class="card-header">
                <p @click="openTaskDescription()" class="card-title">{{task.title}}</p>
                <div class="d-flex">
                    <div
                        v-if="task.user"
                        v-html="avatar(task.user.avatarURL,task.user.firstName,task.user.lastName)"
                    ></div>
                </div>
            </div>
            <div class="card-footer flex mt-4 justify-between items-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small icon text color="grey" v-on="on">
                            <v-icon left>more_vert</v-icon>
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
                <!-- <span class="caption font-weight-thin">{{task.id}}</span> -->
                <span
                    class="task-date font-italic grey--text"
                >{{task.createdDate | dateFormat(task.createdDate) }}</span>
                <Chip :color="task.tags.color">{{task.tags.title}}</Chip>
            </div>
        </div>
        <v-dialog v-model="formModal" persistent max-width="550">
            <TaskForm v-if="formModal" :epicId="task.epic.id" :task="task" @closed="closeForm()"></TaskForm>
        </v-dialog>
        <v-dialog v-model="taskDescModal" max-width="550">
            <TaskSummery v-if="taskDescModal" :task="task" @editTask="taskDescModal=false;formModal=true"></TaskSummery>
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
import Chip from './Chip.vue';
import ConfirmBox from '../components/ConfirmBox';
import TaskSummery from '../components/TaskSummery';
import { EventBus } from '../eventBus';
export default {
    name: 'TaskCard',
    components: {
        Chip,
        TaskForm,
        ConfirmBox,
        TaskSummery,
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
            taskDescModal:false,
            confirmBox: {
                show: false,
                message: null,
                payload: null,
            },
        };
    },
    computed: {},
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
        openTaskDescription() {
            this.taskDescModal = true;
        },
        closeForm() {
            if (this.task) {
                this.task = this.$store.getters['tasks/GET_TASK_BY_ID'](this.task.id);
            }
            this.formModal = false;
        },
        avatar(url, fname, lname) {
            let result;
            if (url) {
                result = `<img src="${url}" />`;
            } else {
                result = `
                <div class="avatar-circle">
                    <span class="initials">${fname.charAt(0)}${lname.charAt(0)}</span>
                </div>
                `;
            }
            return result;
        },
    },
};
</script>
<style lang="scss">
.avatar-circle {
    width: 40px;
    height: 40px;
    background-color: green;
    text-align: center;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    span.initials {
        position: relative;
        top: 12px; /* 25% of parent */
        font-size: 20px; /* 50% of parent */
        line-height: 20px; /* 50% of parent */
        color: #fff;
        text-transform: uppercase;
    }
}
.card-wrapper {
    background-color: #fff;
    border: 1px solid #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.25rem;
    padding: 0.25rem 0.75rem 0.75rem 0.75rem;
    color: #4a5568;
    cursor: move;
    .caption {
        font-family: 'Baloo Tamma 2', cursive !important;
        font-size: 10px !important;
    }
    .card-header {
        display: flex;
        cursor: pointer;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .card-title {
            font-weight: 500;
            margin: 0;
            font-size: 14px;
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
        .task-date {
            font-size: 12px;
            font-style: italic;
            flex-grow: 1;
        }
        button {
            flex-shrink: 1;
            &:hover {
                &::before {
                    opacity: 0;
                }
            }
        }
    }
}
</style>