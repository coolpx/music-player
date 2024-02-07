<template>
    <div class="settings">
        <Header title="Settings" settingsIcon />
        <h3>RPC Server URL</h3>
        <input class="settingInput rpcServerUrl" type="text">
        <br>
        <button class="save" v-on:click="saveValues">Save</button>
    </div>
</template>

<style scoped>
.settings {
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);

    background-color: #00000070;
    backdrop-filter: blur(16px);

    position: fixed;
    top: 0;
    left: 0;

    padding: 8px;
}

h3 {
    margin: 8px 0;
    padding: 0;
}

.save {
    margin-top: 16px;

    background-color: #00ff9d;
    color: #000;
}
</style>

<script>
import { compileScript } from 'vue/compiler-sfc';

function forEachSettingInput(callback) {
    const settingInputs = document.querySelectorAll('.settingInput');

    settingInputs.forEach((input) => {
        if (!(input instanceof HTMLInputElement)) return;
        callback(input);
    });
}

function getSettingClass(classes) {
    const classList = Array.from(classes);
    return classList.find((c) => c !== 'settingInput');
}

function saveValues() {
    const { setUserDataProperty, getUserDataProperty } = useUserData();
    const settings = getUserDataProperty('settings') || {};
    forEachSettingInput((input) => {
        const settingClass = getSettingClass(input.classList);
        settings[settingClass] = input.value;
    });
    setUserDataProperty('settings', settings);
}

export default {
    methods: {
        updateValues() {
            const { getUserDataProperty } = useUserData();
            const settings = getUserDataProperty('settings');
            forEachSettingInput((input) => {
                const settingClass = getSettingClass(input.classList);
                if (settingClass instanceof String) {
                    input.type = 'text';
                }
                input.value = settings[settingClass];
            });
        },
        saveValues
    },
    mounted() {
        this.updateValues();
    },
}
</script>