module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        colors: {
            "transparent": "transparent",

            "white": "#ffffff",
            "black": "black",

            "primary": {
                1: "#F45776",
                2: "#990A27"
            },

            "purple": "#4F0E81",
            "gray": {
                1: "#29272B",
                2: "#231F25"
            }
        },

        fontFamily: {
            "sans": ["Roboto", "sans-serif"]
        },
        fontSize: {
            "sm": "15px",
            "base": "20px",
            "lg": "25px",
            "xl": "48px"
        },

        borderWidth: {
            DEFAULT: "2px",
            lg: "3px"
        },
        borderRadius: {
            DEFAULT: "6px",
            "full": "9999px",
            "none": "0"
        },

        boxShadow: {
            DEFAULT: "0 0 7px rgba(0 0 0 / 0.2)"
        },

        screens: {
            "2xl": { "max": "1535px" },
            "xl": { "max": "1279px" },
            "lg": { "max": "1023px" },
            "md": { "max": "767px" },
            "sm": { "max": "639px" }
        },

        extend: {
            scale: {
                "98": "0.98"
            },

            spacing: {
                "128": "32rem",
            }
        },
    },
    plugins: []
};