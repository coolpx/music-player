<template>
    <Icon class="settingsIcon" v-on:click="toggleSettings"
                v-bind:class="{ 'active': (userData.settingsOpen == true) }" icon="gear" />
</template>

<script setup>
const { setUserDataProperty, getUserDataProperty, userData } = useUserData();

function toggleSettings() {
    setUserDataProperty('settingsOpen', !getUserDataProperty('settingsOpen'));
}
</script>

<style scoped>
@keyframes showBackground {
    from {
        background-color: transparent;
    }

    to {
        background-color: #242430;
    }
}

.settingsIcon {
    background-color: transparent;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
}

.settingsIcon:not(.active):hover {
    animation: showBackground 0.25s forwards;
}

.settingsIcon.active {
    background-color: #242430;
}
</style>