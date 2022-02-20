import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";
import autoprefixer from "autoprefixer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			outputStyle: "compressed",
			prependData: "@import './src/lib/scss/variables.scss';"
		},
		postcss: {
			plugins: [autoprefixer]
		}
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
