// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			htmlAttrs: { lang: 'en' },
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			]
		}
	}
});
