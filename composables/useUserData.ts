import { useState } from "nuxt/app"

type Song = {
    icon: string,
    title: string,
    artist: string,
    album: string,
    duration: string,
    audioUrl: string
}

type UserData = {
    playing: Song | undefined,
    songList: Array<Song>,
    settingsOpen: boolean,
    settings: {
        rpcServerUrl: string
    }
}

export default function () {
    const userData = useState<UserData>('user', () => {
        return {
            playing: undefined, songList: [], settingsOpen: false, settings: {
                rpcServerUrl: 'http://localhost:13525'
            }
        }
    });

    const setUserData = function (user: UserData) {
        userData.value = user
    }

    const setUserDataProperty = function (property: keyof UserData, value: any) {
        userData.value[property] = value
        if (property == 'playing' && navigator && 'mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: value.title,
                artist: value.artist,
                album: value.album,
                artwork: [{ src: value.icon }]
            })
        }
    }

    const getUserData = function () {
        return userData.value
    }

    const getUserDataProperty = function (property: keyof UserData) {
        return userData.value[property]
    }

    const updateSongList = async function () {
        const response = await fetch([userData.value.settings.rpcServerUrl, 'list'].join('/')).catch(() => undefined);

        if (response && response.ok) {
            setUserDataProperty('songList', await response.json());
        } else {
            console.error('Failed to fetch song list');
        }
    }

    return {
        userData, setUserData, setUserDataProperty, getUserData, getUserDataProperty, updateSongList
    }
}