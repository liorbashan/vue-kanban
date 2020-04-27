<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{formTitle}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="tagsForm" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="formInputName"
                                :rules="requiredRule"
                                label="Name"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="formInputColor"
                                :rules="requiredRule"
                                label="Color"
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
    name: 'TagForm',
    props: ['tag'],
    data() {
        return {
            valid: false,
            formInputName: null,
            formInputColor: null,
            requiredRule: [(v) => !!v || 'Name is required'],
            isEditMode: false,
            formTitle: 'Create Tag',
        };
    },
    created() {
        if (this.tag) {
            this.isEditMode = true;
            this.formInputName = this.tag.title;
            this.formInputColor = this.tag.color;
            this.formTitle = `Update  '${this.tag.title}'  tag`;
        }
    },
    methods: {
        close: function() {
            this.$refs.tagsForm.reset();
            this.$emit('closed');
        },
        create: async function() {
            if (this.$refs.tagsForm.validate()) {
                const newTag = [{ title: this.formInputName, color: this.formInputColor }];
                const result = await this.$store.dispatch('tags/addNewTag', newTag).catch((error) => {
                    EventBus.$emit('SHOW_ERROR', error);
                });
                if (result) {
                    EventBus.$emit('SHOW_SUCCESS', `New Tag Created!`);
                }
                this.close();
            }
        },
    },
};
</script>

<style>
</style>