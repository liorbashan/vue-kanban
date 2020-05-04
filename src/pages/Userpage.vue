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
                                <td>{{item.title}}</td>
                                <td>{{item.color}}</td>
                                <td>
                                    <v-container class="d-flex justify-between">
                                        <v-btn
                                            class="mr-4"
                                            @click="editUserg(item.title)"
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
            <!-- <TagForm v-if="formModal" :tag="tagToEdit" @closed="formModal = false"></TagForm> -->
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'Userpage',
    data() {
        return {
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'title' },
                { text: 'Color (#)', value: 'color' },
                { text: '', value: '' },
            ],
            formModal: false,
            userToEdit: null,
        };
    },
    computed: {
        usersList() {
            return this.$store.getters['tags/getTags'];
        },
    },
    methods: {
        openCreateForm() {
            this.tagToEdit = null;
            this.formModal = true;
        },
        deleteUser: async function(tagId) {
            await this.$store.dispatch('tags/deleteTag', tagId);
            await this.$store.dispatch('tags/getAllTags');
            EventBus.$emit('SHOW_ERROR', 'Tag Deleted');
        },
        editUser: async function(tagTitle) {
            this.tagToEdit = await this.$store.getters['tags/getTag'](tagTitle);
            this.formModal = true;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>