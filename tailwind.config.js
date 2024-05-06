/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                planet: "#0F76F0",
                highlight: "#FFC700",
            },
            fontFamily: {
                body: ['"Hanken Grotesk Variable", sans-serif'],
            },
        },
    },
    plugins: [],
}
