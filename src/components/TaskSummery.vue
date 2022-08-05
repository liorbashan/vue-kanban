<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{ task.title }}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-textarea v-model="task.description" label="Description" outlined disabled></v-textarea>
                        <v-text-field v-model="userName" label="Assigned To" disabled></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn x-small depressed fab outlined color="gray" @click="editTask()">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'TaskSummery',
    props: ['task'],
    data() {
        return {
            userName: `${this.task.user.firstName} ${this.task.user.lastName}`,
        };
    },
    methods: {
        editTask() {
            this.$emit('editTask');
        },
    },
};
</script>

<style lang="scss" scoped>
</style>