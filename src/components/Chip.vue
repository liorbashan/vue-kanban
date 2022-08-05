<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="chipWrapper" :class="`${color} accent-1 ${color}--text text--darken-4`">
        <span class="dot" :class="`${color} accent-3`"></span>
        <span class="tag">
            <slot></slot>
        </span>
    </div>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: 'teal',
        },
    },
};
</script>
<style lang="scss" scoped>
.chipWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 24px;
    padding: 0 8px;
    text-transform: capitalize;
    .dot {
        width: 8px;
        height: 8px;
        border-radius: 9999px;
        align-self: center;
        margin: 0 12px 0 0;
    }
    .tag {
        align-self: center;
        font-weight: 500;
        font-size: 0.9rem;
    }
}
</style>
