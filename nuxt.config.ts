import { defineNuxtConfig } from 'nuxt'
import config from './config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/scss/variables.scss";',
				},
			},
		},
	},
	runtimeConfig: {
		public: {
			maxJewelsPerPage: 16,
			filters: Object.keys(config).map(key => ({key, vals: config[key]}))
		}
	}
});
