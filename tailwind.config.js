/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],

	theme: {
		extend: {
			colors: {
				darkest: '#000000',
				dark: '#161616',
				company: '#FC5102',
			},
			backgroundImage: {
				'yellow-blur': "url('/src/assets/imgs/bg-blur.png')",
			},
		},
		fontFamily: {
			nekst: ['Nekst', 'sans-serif'],
		},
	},
	plugins: [],
}
