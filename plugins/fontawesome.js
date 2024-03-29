import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

library.add(fas);

export default defineNuxtPlugin((app) => {
    app.vueApp.component('Icon', FontAwesomeIcon, {})
});