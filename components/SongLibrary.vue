<template>
    <div>
        <div v-if="userData.songList.length > 0">
            <div class="songRowContainer" v-for="(item, index) in userData.songList">
                <SongRow :icon="item.icon" :title="item.title" :artist="item.artist" :album="item.album"
                    :duration="item.duration" :audioUrl="item.audioUrl" />
            </div>
        </div>
        <p v-else>Are you running the <a href="https://github.com/coolpx/music-player-rpc">RPC server</a>?</p>
    </div>
</template>

<script setup>
const { userData, updateSongList } = useUserData();

await updateSongList();
</script>

<style scoped>
.songRowContainer {
    padding: 0 4px;
}

.songRowContainer:nth-child(even)>* {
    background-color: transparent;
}
</style>