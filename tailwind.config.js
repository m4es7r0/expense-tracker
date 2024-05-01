/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        screens: {
            sm: "380px",
            md: "420px",
            lg: "680px",
            tablet: "1024px",
        },
        extend: {
            colors: {
                primary: {
                    50: "#f6f6f6",
                    100: "#e7e7e7",
                    200: "#d1d1d1",
                    400: "#888888",
                    500: "#6d6d6d",
                    700: "#4d4d4d",
                    800: "#454545",
                },
                accent: { 500: "#f7bc0c" },
                error: { 50: "#fff1f1", 500: "#ff3232" },
                gray: { 500: "#39324a", 700: "#221c30" },
            },
        },
    },
    plugins: [],
};
