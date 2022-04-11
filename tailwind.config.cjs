module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        colors: {
            "transparent": "transparent",

            "white": "#ffffff",
            "black": "black",
            "black-transparent": "rgba(0 0 0 / 0.7)",

            "primary": {
                1: "#F45776", // real primary
                2: "#990A27" // for gradiant
            },

            "secondary": "#3F00FF",

            "purple": {
                1: "#4F0E81", 
                2: "#220836"
            },
            "gray": {
                0: "#303030", // for hr, micro-elements...
                1: "#29272B", // for elements (button, cards...)
                2: "#231F25" // for base background (navbar, section...)
            }
        },

        fontFamily: {
            "sans": ["Roboto", "sans-serif"],
            "title": ["Bungee", "Roboto", "sans-serif"]
        },
        fontSize: {
            "sm": "15px",
            "base": "20px",
            "lg": "28px",
            "xl": "56px",
            "xl-auto": "calc(1.5em + 3.6vw)"
        },

        backgroundImage: {
            "sun-tornado": "url('/img/background/sun-tornado.svg')",
            "sun-tornado-animated": "url('/img/background/sun-tornado-animated.svg')"
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
        textDecorationThickness: {
            base: "3px"
        },

        boxShadow: {
            DEFAULT: "0 0 7px rgba(0 0 0 / 0.2)",
            "white": "0 0 10px rgba(255 255 255 / 0.05)"
        },

        screens: {
            "2xl": { "max": "1535px" },
            "xl": { "max": "1279px" },
            "lg": { "max": "1023px" },
            "md": { "max": "767px" },
            "sm": { "max": "639px" }
        },

        extend: {
            height: {
                "0.5": "0.125rem",
                "navbar": "4rem",
                "navbar-adjust": "calc(100vh - 4rem)"
            },

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