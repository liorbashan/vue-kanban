<template>
    <div id="app">
        <Homepage/>
        <router-view />
    </div>
</template>

<script>
import Homepage from './pages/Homepage';
export default {
    name: 'App',
    components: { Homepage },
    data() {
        return {};
    },
};
</script>

<style scoped>
</style>
