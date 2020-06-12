<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>{{formTitle}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="userForm" @submit.prevent @keydown.esc.native="close" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="fname"
                                :rules="requiredRule"
                                label="First Name"
                                required
                                ref="firstInput"
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
                                :disabled="isEditMode"
                                required
                                clearable
                                auto-grow
                            ></v-text-field>
                            <v-text-field
                                v-model="avatarUrl"
                                label="Avatar Url"
                                clearable
                                auto-grow
                                @keydown.enter.native="createNewUser"
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
            this.formTitle = 'Update User Details';
            this.fname = this.user.firstName;
            this.lname = this.user.lastName;
            this.email = this.user.email;
            this.avatarUrl = this.user.avatarURL;
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.firstInput.focus();
        }, 0);
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
                    payload.id = this.user.id;
                    const updateResult = await this.$store.dispatch('users/UPDATE_USER', payload).catch((error) => {
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

<style lang="scss" scoped>
</style>