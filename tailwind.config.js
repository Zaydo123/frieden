// @ts-check

// Import the Skeleton plugin using require syntax for better Docker compatibility
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@skeletonlabs/skeleton/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {},
	},
	plugins: [
		// Use top-level await to import the plugin synchronously
		...(() => {
			const skeletonImport = require('@skeletonlabs/tw-plugin');
			const friedenTheme = require('./frieden-theme.js');
			return [
				skeletonImport.skeleton({
					themes: {
						custom: [friedenTheme.friedenTheme]
					}
				})
			];
		})()
	]
}
