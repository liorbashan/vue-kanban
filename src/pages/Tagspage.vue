<template>
    <v-container class="white pa-2" fluid>
        <v-row align="center" justify="space-between">
            <v-col col="2">
                <h1 class="black--text">Tags</h1>
            </v-col>
            <v-col align="right" col="2">
                <v-btn @click="openCreateForm()" color="secondary" depressed>
                    add
                    <v-icon right dark>add_circle</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="8" col="12">
                <v-data-table
                    :headers="headers"
                    :items="tagsList"
                    :items-per-page="10"
                    class="elevation-1"
                >
                    <template v-if="tagsList.length > 0" v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>{{item.id}}</td>
                                <td>{{item.title}}</td>
                                <td>{{item.color}}</td>
                                <td>
                                    <v-btn
                                        @click="editTag(item.title)"
                                        fab
                                        depressed
                                        color="secondary"
                                        small
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn
                                        @click="deleteTag(item.id)"
                                        fab
                                        depressed
                                        color="secondary"
                                        small
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog v-model="formModal" persistent max-width="550">
            <TagForm v-if="formModal" :tag="tagToEdit" @closed="formModal = false"></TagForm>
        </v-dialog>
    </v-container>
</template>

<script>
import TagForm from '../components/TagForm';
export default {
    name: 'Tagpage',
    components: { TagForm },
    data() {
        return {
            headers: [
                {
                    text: 'ID',
                    value: 'id',
                },
                { text: 'Name', value: 'title' },
                { text: 'Color (#)', value: 'color' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            formModal: false,
            tagToEdit: null,
        };
    },
    computed: {
        tagsList: function() {
            return this.$store.getters['tags/getTags'];
        },
    },
    methods: {
        openCreateForm() {
            this.tagToEdit = null;
            this.formModal = true;
        },
        deleteTag: async function(tagId) {
            const res = await this.$store.dispatch('tags/deleteTag', tagId);
            this.$store.dispatch('tags/getAllTags');
        },
        editTag: async function(tagTitle) {
            this.tagToEdit = await this.$store.getters['tags/getTag'](tagTitle);
            this.formModal = true;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>