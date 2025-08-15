import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapterGhpages from "svelte-adapter-ghpages";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		paths: {
			base: "/SimpleQuizMaker",
		},
		// ...
		adapter: adapterGhpages(
			{
				// default options are shown
				pages: 'build',
				assets: 'build',
				fallback: null
			}
		),
	}
};

export default config;
