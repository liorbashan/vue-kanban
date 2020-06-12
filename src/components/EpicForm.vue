<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{formTitle}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="epicForm" @keydown.esc.native="close" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="formInputName"
                                :rules="requiredRule"
                                label="Name"
                                required
                                :disabled="isEditMode"
                                ref="firstInput"
                            ></v-text-field>

                            <v-text-field
                                v-model="formInputDesc"
                                :rules="requiredRule"
                                label="Description"
                                required
                                @keydown.enter.native="create"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" depressed @click="close()">Close</v-btn>
                        <v-btn :disabled="!valid" color="success" depressed @click="create()">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { EventBus } from '@/eventBus';
export default {
    name: 'EpicForm',
    props: ['epic', 'projectId'],
    data() {
        return {
            valid: false,
            formInputName: null,
            formInputDesc: null,
            requiredRule: [(v) => !!v || 'Name is required'],
            isEditMode: false,
            formTitle: 'Create New Epic',
        };
    },
    created() {
        if (this.epic) {
            this.isEditMode = true;
            this.formInputName = this.epic.name;
            this.formInputDesc = this.epic.description;
            this.formTitle = `Update  ${this.epic.name}`;
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.firstInput.focus();
        }, 0);
    },
    methods: {
        close: function() {
            this.$refs.epicForm.reset();
            this.$emit('closed');
        },
        create: async function() {
            if (this.$refs.epicForm.validate()) {
                if (!this.isEditMode) {
                    const newEpic = { name: this.formInputName, desc: this.formInputDesc, projectId: this.projectId };
                    const result = await this.$store.dispatch('epics/ADD_NEW_EPIC', newEpic).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error);
                    });
                    if (result) {
                        EventBus.$emit('SHOW_SUCCESS', `New Epic Created!`);
                    }
                } else {
                    const vars = { epicId: this.epic.id, desc: this.formInputDesc };
                    const updateResult = await this.$store.dispatch('epics/UPDATE_EPIC', vars).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error);
                    });
                    if (updateResult) {
                        EventBus.$emit('SHOW_SUCCESS', `Epic Updated!`);
                    }
                }
                this.close();
            }
        },
    },
};
</script>

<style>
</style>