module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        error: '#FF0000',
      },
      borderColor: theme => ({
        ...theme('colors'),
        'error': '#FF0000',
      }),
      textColor: theme => ({
        ...theme('colors'),
        'error': '#FF0000',
      }),
    },
  },
  plugins: [],
};
