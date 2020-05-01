<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{formTitle}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="taskForm" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="taskTitle"
                                :rules="requiredRule"
                                label="Name"
                                required
                            ></v-text-field>
                            <v-textarea
                                v-model="taskDesc"
                                :rules="requiredRule"
                                label="Description"
                                required
                                outlined
                                clearable
                                auto-grow
                            ></v-textarea>
                            <v-select
                                v-model="tagId"
                                :items="tags"
                                item-text="title"
                                item-value="id"
                                label="Tag"
                                :rules="requiredRule"
                            ></v-select>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" depressed @click="close()">Close</v-btn>
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            depressed
                            @click="createNewTask()"
                        >Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { EventBus } from '@/eventBus';
import store from '../store';
export default {
    name: 'TaskForm',
    props: ['task', 'epicId'],
    data() {
        return {
            valid: false,
            taskTitle: null,
            taskDesc: null,
            tagId: null,
            user: null,
            requiredRule: [(v) => !!v || 'Name is required'],
            isEditMode: false,
            formTitle: 'Create New Task',
        };
    },
    created() {
        if (this.task) {
            this.isEditMode = true;
            this.taskTitle = this.task.title;
            this.taskDesc = this.task.description;
            this.tagId = this.task.tags.id;
            this.user = this.task.user;
        }
    },
    computed: {
        tags() {
            return store.getters['tags/getTags'];
        },
    },
    methods: {
        close() {
            this.$refs.taskForm.reset();
            this.$emit('closed');
        },
        async createNewTask() {
            if (this.$refs.taskForm.validate()) {
                const newTag = {
                    taskTitle: this.taskTitle,
                    taskDesc: this.taskDesc,
                    tagId: this.tagId,
                    epicId: this.epicId,
                    user: null,
                };
                if (!this.isEditMode) {
                    const task = await this.$store.dispatch('tasks/ADD_NEW_TASK', newTag).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error);
                    });
                    if (task) {
                        EventBus.$emit('SHOW_SUCCESS', 'New Task Added');
                    }
                } else {
                    // TODO: edit task
                    console.log('edit task');
                }
                this.close();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>