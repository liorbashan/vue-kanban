<template>
    <v-dialog v-model="show" persistent width="500">
        <v-card>
            <v-card-title
                id="confirmTitle"
                class="headline blue lighten-2"
                primary-title
            >Confirmation Required!</v-card-title>
            <v-card-text class="my-8">
                <h3>{{message}}</h3>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-sm-space-between">
                <v-btn @click="sendResult(true)" color="green darken-1" depressed>Yes</v-btn>
                <v-btn @click="sendResult(false)" color="red lighten-1" depressed>No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmBox',
    props: ['message'],
    data() {
        return {
            show: true,
        };
    },
    methods: {
        sendResult(val) {
            this.$emit('close', val);
        },
    },
};
</script>

<style>
</style>