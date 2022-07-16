module.exports = {
    darkMode: 'class',
    content: ['./pages/**/*.{js,jsx,md,mdx,ts,tsx}', './components/**/*.{js,jsx,md,mdx,ts,tsx}'],
    theme: {
        colors: {
            'dark-bg': '#22272E',
            'dark-bg-hover': '#292E36',
            'dark-bg-secondary': '#2C2F33',
            'dark-bg-secondary-hover': '#383B40',
            'dark-border': '#444C56',
            'dark-text': '#ADBAC6',
            'dark-text-hover': '#BAC6D1', //  #9FA8B4
        },
        extend: {},
    },
    variants: {
        extend: {
            display: ['group-hover'],
        },
    },
    plugins: [],
};
