<template>
    <v-container justify="center" class="white pa-2" fluid>
        <v-row align="center" justify="space-between" class="justify-center">
            <v-col align="center" col="2">
                <h1 class="black--text">Users</h1>
            </v-col>
            <v-col align="center" col="2">
                <v-btn @click="openCreateForm()" color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-col md="8" col="12">
                <v-data-table
                    light
                    dense
                    hide-default-header
                    hide-default-footer
                    :headers="headers"
                    :items="usersList"
                    :items-per-page="10"
                    class="elevation-1"
                >
                    <template v-if="usersList.length > 0" v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>{{item.id}}</td>
                                <td>{{item.firstName}}</td>
                                <td>{{item.lastName}}</td>
                                <td>{{item.email}}</td>
                                <td>{{item.avatarURL}}</td>
                                <td>
                                    <v-container class="d-flex justify-between">
                                        <v-btn
                                            class="mr-4"
                                            @click="editUserg(item.id)"
                                            icon
                                            depressed
                                            color="info"
                                            small
                                        >
                                            <v-icon>edit</v-icon>
                                        </v-btn>
                                        <v-btn
                                            @click="deleteUser(item.id)"
                                            icon
                                            depressed
                                            color="error"
                                            small
                                        >
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </v-container>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog v-model="formModal" persistent max-width="550">
            <UsersForm v-if="formModal" :user="userToEdit" @closed="formModal = false"></UsersForm>
        </v-dialog>
    </v-container>
</template>

<script>
import UsersForm from '../components/UsersForm';
export default {
    name: 'Userpage',
    components: { UsersForm },
    data() {
        return {
            headers: [
                { text: 'Id', value: 'id' },
                { text: 'First Name', value: 'firstName' },
                { text: 'Last Name', value: 'lastName' },
                { text: 'Email', value: 'email' },
                { text: 'Avatar', value: 'avatarUrl' },
            ],
            formModal: false,
            userToEdit: null,
        };
    },
    // TODO: add filter to resolve avatar url or icons with letters.
    computed: {
        usersList() {
            return this.$store.getters['users/GET_ALL_USERS'];
        },
    },
    methods: {
        openCreateForm() {
            this.userToEdit = null;
            this.formModal = true;
        },
        deleteUser: async function(tagId) {
            // await this.$store.dispatch('tags/deleteTag', tagId);
            // await this.$store.dispatch('tags/getAllTags');
            // EventBus.$emit('SHOW_ERROR', 'Tag Deleted');
        },
        editUser: async function(userId) {
            this.userToEdit = await this.$store.getters['users/GET_USER'](userId);
            this.formModal = true;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>