<template>
    <div>
        <Header title="Library" settingsIcon />
        <Settings v-show="userData.settingsOpen" />
        <SongLibrary class="library" />
    </div>
    <Player />
</template>

<script setup>
const { userData } = useUserData();
</script>

<style scoped>
.library {
    margin-bottom: calc(80px + 16px + 16px);
}
</style>