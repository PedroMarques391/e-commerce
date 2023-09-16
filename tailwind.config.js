/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}', './*.{html,js}'],
  theme: {
    extend: {
      screens: {
        tabets: '430px',
      },
    },
  },
  plugins: [],
};
