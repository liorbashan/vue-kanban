<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{formTitle}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="userForm" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="fname"
                                :rules="requiredRule"
                                label="First Name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="lname"
                                :rules="requiredRule"
                                label="Last Name"
                                required
                                auto-grow
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                :rules="requiredRule"
                                label="Email"
                                required
                                clearable
                                auto-grow
                            ></v-text-field>
                            <v-text-field
                                v-model="avatarUrl"
                                label="Avatar Url"
                                clearable
                                auto-grow
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" depressed @click="close()">Close</v-btn>
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            depressed
                            @click="createNewUser()"
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
    name: 'UsersForm',
    props: ['user'],
    data() {
        return {
            valid: false,
            fname: null,
            lname: null,
            email: null,
            avatarUrl: null,
            requiredRule: [(v) => !!v || 'Field is required'],
            isEditMode: false,
            formTitle: 'Add New User',
        };
    },
    created() {
        if (this.user) {
            this.isEditMode = true;
            this.fname = this.user.fname;
            this.lname = this.user.lname;
            this.email = this.user.email;
            this.avatarUrl = this.user.avatarUrl;
        }
    },
    computed: {
        usersList() {
            return store.getters['users/GET_ALL_USERS'];
        },
    },
    methods: {
        close() {
            this.$refs.userForm.reset();
            this.$emit('closed');
        },
        async createNewUser() {
            if (this.$refs.userForm.validate()) {
                let payload = {
                    email: this.email,
                    fname: this.fname,
                    lname: this.lname,
                    avatarUrl: this.avatarUrl,
                };
                if (!this.isEditMode) {
                    const result = await this.$store.dispatch('users/ADD_NEW_USER', payload).catch((error) => {
                        EventBus.$emit('SHOW_ERROR', error);
                    });
                    if (result) {
                        EventBus.$emit('SHOW_SUCCESS', `New Epic Created!`);
                    }
                } else {
                    this.formTitle = 'Update User Details';
                    // const updateResult = await this.$store.dispatch('users/UPDATE_EPIC', vars).catch((error) => {
                    //     EventBus.$emit('SHOW_ERROR', error);
                    // });
                    // if (updateResult) {
                    //     EventBus.$emit('SHOW_SUCCESS', `Epic Updated!`);
                    // }
                }

                this.close();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>