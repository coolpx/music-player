<template>
    <div class="songRow" v-on:click="play">
        <img class="songImage" :src="icon">
        <p class="songTitle">{{ title }}</p>
        <p class="songArtist">{{ artist }}</p>
        <p class="songAlbum">{{ album }}</p>
        <p class="songDuration">{{ duration }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    icon: {
        type: String,
        default: '/images/checkerboard.png'
    },
    title: {
        type: String,
        default: 'Title'
    },
    artist: {
        type: String,
        default: 'Artist'
    },
    album: {
        type: String,
        default: 'Album'
    },
    duration: {
        type: String,
        default: '0:00'
    },
    audioUrl: {
        type: String,
        default: '/audio/silence.mp3'
    }
});

</script>

<script lang="ts">
export default {
    name: 'SongRow',
    methods: {
        play() {
            const { userData, setUserData } = useUserData();
            setUserData({ playing: { icon: this.icon, title: this.title, artist: this.artist, album: this.album, duration: this.duration, audioUrl: this.audioUrl } })
        }
    }
}
</script>

<style scoped>
.songRow {
    width: auto;
    height: 32px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-flow: row;

    padding: 8px 8px;

    background-color: #242430;
    border-radius: 12px;

    cursor: pointer;
}

.songRow>p {
    flex: 1;
    text-align: left;
}

.songRow>p:last-child {
    flex: 0 0 auto;
    width: 40px;
    text-align: center;
}

.songImage {
    height: 100%;
    border-radius: 4px;
    margin-right: 8px;
}
</style>