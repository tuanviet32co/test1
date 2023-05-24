/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                first: {
                    default: '#0069d5',
                    hover: '#80b4ea',
                },
                second: '#eaf1fa',
                third: '#55bb89',
            },
            textColor: {
                first: {
                    default: '#0069d5',
                    hover: '#80b4ea',
                },
                second: '#55bb89',
            },
            // backgroundImage: {
            //     signin: "url('/src/assets/sign-in-bg.png')",
            // },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
      }
};
