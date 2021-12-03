const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		backgroundColor: (theme) => ({ ...theme('colors'), 'orange': '#FF5800' }),
		extend: {}
	},

	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'light' // first one will be the default theme
		]
	}
};

module.exports = config;
