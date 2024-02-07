<template>
    <div class="header">
        <h1>{{ props.title }}</h1>
        <SettingsIcon v-show="props.settingsIcon" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    settingsIcon: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px 16px 16px;
}

.header h1 {
    margin: 0;
}
</style>