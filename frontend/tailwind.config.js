/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#DAA520', // Goldenrod
                secondary: '#3E2723', // Dark Brown
                accent: '#FF8C00', // Dark Orange
                background: '#FFFAF0', // Floral White
                surface: '#FFFFFF',
                text: {
                    DEFAULT: '#2C1810',
                    light: '#6D4C41'
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
