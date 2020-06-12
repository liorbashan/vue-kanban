<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{formTitle}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="projectsForm" @keydown.esc.native="close" v-model="valid" lazy-validation>
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
                                 @keydown.enter.native="create"
                                required
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
    name: 'ProjectForm',
    props: ['project'],
    data() {
        return {
            valid: false,
            formInputName: null,
            formInputDesc: null,
            requiredRule: [(v) => !!v || 'Name is required'],
            isEditMode: false,
            formTitle: 'Create Project',
        };
    },
    created() {
        if (this.project) {
            this.isEditMode = true;
            this.formInputName = this.project.name;
            this.formInputDesc = this.project.description;
            this.formTitle = `Update  '${this.project.name}'  project`;
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.firstInput.focus();
        }, 0);
    },
    methods: {
        close: function() {
            this.$refs.projectsForm.reset();
            this.$emit('closed');
        },
        create: async function() {
            if (this.$refs.projectsForm.validate()) {
                if (!this.isEditMode) {
                    const newProj = { name: this.formInputName, desc: this.formInputDesc };
                    const result = await this.$store.dispatch('projects/ADD_NEW_PROJECT', newProj).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error);
                    });
                    if (result) {
                        EventBus.$emit('SHOW_SUCCESS', `New Project Created!`);
                    }
                } else {
                    const vars = { id: this.project.id, description: this.formInputDesc };
                    const updateResult = await this.$store.dispatch('projects/UPDATE_PROJECT', vars).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error);
                    });
                    if (updateResult) {
                        EventBus.$emit('SHOW_SUCCESS', `Project Updated!`);
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