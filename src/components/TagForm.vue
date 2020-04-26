<template>
    <v-container class="pb-0">
        <v-row>
            <v-col class="pa-0">
                <v-card>
                    <v-card-title>
                        <h2>Create Tag</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Tag Name" required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Tag Color" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="close()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'TagForm',
    data() {
        return {};
    },
    methods: {
        close: function() {
            this.$emit('clicked');
        },
    },
};
</script>

<style>
</style>