<template>
    <div class="songRow" v-on:click="play">
        <img class="songImage" loading="lazy" :src="icon">
        <p class="songTitle">{{ title }}</p>
        <p class="songArtist">{{ artist }}</p>
        <p class="songAlbum">{{ album }}</p>
        <p class="songDuration">{{ duration }}</p>
    </div>
</template>

<script>
export default {
    name: 'SongRow',
    methods: {
        play() {
            const { setUserDataProperty } = useUserData();
            setUserDataProperty('playing', { icon: this.icon, title: this.title, artist: this.artist, album: this.album, duration: this.duration, audioUrl: this.audioUrl });
            setUserDataProperty('isPlaying', true);
        }
    },
    props: {
        icon: {
            type: String,
            default: '/images/checkerboard.png'
        },
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        album: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        audioUrl: {
            type: String,
            required: true
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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