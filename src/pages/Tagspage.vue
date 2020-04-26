<template>
    <v-container class="white pa-2" fluid>
        <v-row>
            <v-col>
                <h1 class="display-1 font-weight-black black--text">Tags</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="col-5">
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
                                <td>EDIT</td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Tagpage',
    data() {
        return {
            headers: [
                {
                    text: 'ID',
                    value: 'id',
                },
                { text: 'Name', value: 'title' },
                { text: 'Color (#)', value: 'color' },
                {text: '', value:''}
            ],
            tagsList: [],
        };
    },
    created() {
        this.tagsList = this.$store.getters['tags/getTags'];
    },
};
</script>

<style lang="scss" scoped>
</style>