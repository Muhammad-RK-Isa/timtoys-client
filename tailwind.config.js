/** @type {import('tailwindcss').Config} */
const withMT = require( "@material-tailwind/react/utils/withMT" );

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{jsx, js}"
  ],
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#824f40",

          "secondary": "#ffffff",

          "accent": "#3e261e",

          "neutral": "#eef5f7",

          "base-100": "#FFFFFF",

          "info": "#3ABFF8",

          "success": "#36D399",

          "warning": "#FBBD23",

          "error": "#F87272",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        "sans": [ "Manrope", "sans-serif" ],
        "Josefin": [ "Josefin Sans", "sans-serif" ],
      }
    },
  },
  plugins: [
    require( "daisyui" )
  ],
});
