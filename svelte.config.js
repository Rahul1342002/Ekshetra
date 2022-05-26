import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import ESBuildNodePolyfillsPlugin from 'esbuild-plugin-node-polyfills'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			platform: "node",
			plugins: [ESBuildNodePolyfillsPlugin]
		})
	},
};

export default config;
