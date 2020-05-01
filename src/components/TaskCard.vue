<template>
    <div class="card-wrapper">
        <div class="card-header">
            <p class="card-title">{{task.title}}</p>
            <img
                class="w-6 h-6 rounded-full ml-3"
                src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png"
                alt="Avatar"
            />
        </div>
        <div class="card-footer flex mt-4 justify-between items-center">
            <span class="text-sm text-gray-600">{{task.createdDate | dateFormat(task.createdDate) }}</span>
            <badge :color="task.tags.color">{{task.tags.title}}</badge>
        </div>
    </div>
</template>
<script>
import Badge from './Badge.vue';
export default {
    name: 'TaskCard',
    props: ['taskId'],
    components: {
        Badge,
    },
    props: {
        task: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        badgeColor() {
            const mappings = {
                Design: 'purple',
                'Feature Request': 'teal',
                Backend: 'blue',
                QA: 'green',
                default: 'teal',
            };
            return mappings[this.task.type] || mappings.default;
        },
    },
    filters: {
        dateFormat(date) {
            let d = new Date(date);
            let datestring =
                ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
            return datestring
        },
    },
};
</script>
<style lang="scss" scoped>
.card-wrapper {
    background-color: #fff;
    border: 1px solid #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.25rem;
    padding: 0.75rem;
    cursor: move;
    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        .card-title {
            font-weight: 500;
            margin: 0;
            font-size: 20px;
            text-transform: capitalize;
        }
        .card-desc {
            font-weight: 400px;
        }
        img {
            border-radius: 9999px;
            margin-left: 12px;
            width: 32px;
            height: 32px;
            align-self: baseline;
        }
    }
    .card-footer {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
}
</style>