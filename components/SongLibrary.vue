<template>
    <div v-if="items">
        <div class="songRowContainer" v-for="(item, index) in items">
            <SongRow :icon="item.icon" :title="item.title" :artist="item.artist" :album="item.album"
                :duration="item.duration" :audioUrl="item.audioUrl" />
        </div>
    </div>
    <p v-else>Are you running the RPC server?</p>
</template>

<script setup>
const items = ref(undefined);

const { updateSongList, getUserDataProperty } = useUserData();

await updateSongList();

items.value = getUserDataProperty('songList');
</script>

<style scoped>
.songRowContainer {
    padding: 0 4px;
}

.songRowContainer:nth-child(even) > * {
    background-color: transparent;
}
</style>