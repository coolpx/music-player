<template>
    <div v-show="userData.playing" class="player">
        <audio :src="userData.playing?.audioUrl" loading="lazy" ref="audio" @timeupdate="updateTime" autoplay></audio>
        <div class="player-info">
            <p>{{ userData.playing?.artist }}</p>
            <p>{{ userData.playing?.album }}</p>
            <p>{{ userData.playing?.title }}</p>
        </div>
        <div class="audio-controls">
            <div class="time-controls seekbar-container">
                <p>Time</p>
                <input class="seekbar" type="range" min="0" :max="totalDuration" v-model="currentTime" @input="seek">
            </div>
            <div class="volume-controls seekbar-container">
                <p>Volume</p>
                <input class="seekbar volume" type="range" min="0" max="100" v-model="volume" @input="seekVolume">
            </div>
            <div class="playback-controls-container">
                <p>Playback</p>
                <div class="playback-controls">
                    <Icon icon="backward" v-on:click="backward" />
                    <Icon v-bind:icon="(userData.isPlaying == true) ? 'pause' : 'play'" v-on:click="togglePlaying" />
                    <Icon icon="forward" v-on:click="forward" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { userData } = useUserData();
</script>

<script>
async function navigateSong(offset) {
    const { getUserDataProperty, setUserDataProperty, updateSongList } = useUserData();

    // get song list
    let songList = getUserDataProperty('songList');
    const playing = getUserDataProperty('playing');

    if (!songList) {
        await updateSongList();
        songList = getUserDataProperty('songList');
    }

    if (!songList || !playing) return;

    // get current song index
    let currentSongIndex = -1;
    for (let i = 0; i < songList.length; i++) {
        if (songList[i].audioUrl === playing.audioUrl) {
            currentSongIndex = i;
            break;
        }
    }

    // get previous song
    let nextSong = undefined;

    if (currentSongIndex > 0) {
        nextSong = songList[currentSongIndex + offset];
    }

    // set previous song as playing
    setUserDataProperty('playing', nextSong);
}

function getAudio() {
    return document.querySelector('audio');
}

function togglePlaying() {
    const { setUserDataProperty } = useUserData();
    const audio = getAudio();
    if (audio.paused) {
        audio.play();
        setUserDataProperty('isPlaying', true)
    } else {
        audio.pause();
        setUserDataProperty('isPlaying', false)
    }
}

function backward() {
    navigateSong(-1);
}

function forward() {
    navigateSong(1);
}

if (navigator && 'mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', function () {
        const { setUserDataProperty } = useUserData();
        const audio = getAudio();
        audio.play();
        setUserDataProperty('isPlaying', true)
    });

    navigator.mediaSession.setActionHandler('pause', function () {
        const { setUserDataProperty } = useUserData();
        const audio = getAudio();
        audio.pause();
        setUserDataProperty('isPlaying', false)
    });

    navigator.mediaSession.setActionHandler('previoustrack', function () {
        navigateSong(-1);
    });

    navigator.mediaSession.setActionHandler('nexttrack', function () {
        navigateSong(1);
    });
}

export default {
    data() {
        return {
            currentTime: 0,
            totalDuration: 0,
            volume: 100
        };
    },
    mounted() {
        const audio = getAudio();
        this.totalDuration = audio.duration;
        audio.onended = () => {
            navigateSong(1);
            audio.time = 0;
        };
    },
    methods: {
        updateTime() {
            const audio = getAudio();
            this.currentTime = audio.currentTime;
            this.totalDuration = audio.duration;
        },
        seek() {
            const { setUserDataProperty } = useUserData();
            const audio = getAudio();
            audio.currentTime = this.currentTime;
            audio.play();
            setUserDataProperty('isPlaying', true)
        },
        togglePlaying,
        backward,
        forward,
        seekVolume() {
            const audio = getAudio();
            const volume = document.querySelector('.volume');
            this.volume = volume.value;
            audio.volume = volume.value / 100;
        }
    },
    beforeMount() {
        const { userData } = useUserData();

        const audio = getAudio();
        audio.volume = this.volume / 100;
        if (userData.isPlaying) audio.play();
    }
};
</script>

<style scoped>
.player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 16px);
    height: 80px;
    background-color: #111217;
    outline: #666a80 1px solid;
    padding: 8px 8px;
    border-radius: 12px 12px 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-flow: column;
}

.player-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-flow: row;
    margin-bottom: 8px;
}

.player>* {
    margin: 0 4px;
    height: 40px;
}

.player-info>p:not(:last-child)::after {
    content: '•';
    margin: 0 8px;
}

.audio-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-flow: row;
}

.audio-controls>div {
    margin: 0 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-flow: column;
}

.audio-controls>div>p {
    margin: 0;
    margin-bottom: 4px;
}

.seekbar-container>p {
    margin-bottom: 12px !important;
}

.seekbar-container>input {
    width: 100%;
    margin: 0;
    margin-bottom: 6px;
}

.seekbar {
    appearance: none;
    height: 4px;
    padding: 0;
    border-radius: 2px;
    background-color: #666a80;
}

.playback-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-flow: row;
    width: 100%;
    max-height: 20px;
}

.playback-controls>svg {
    height: 20px;
    width: 20px;

    margin: 0 4px;
    cursor: pointer;
}
</style>