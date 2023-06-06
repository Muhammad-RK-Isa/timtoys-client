/** @type {import('tailwindcss').Config} */
const withMT = require( "@material-tailwind/react/utils/withMT" );

export default withMT( {
  content: [
    "./index.html",
    "./src/**/*.{jsx, js}"
  ],
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#bfd3bb",

          "secondary": "#141c12",

          "accent": "#b0c9ac",

          "neutral": "#ffffff",

          "base-100": "#090c08",

          "info": "#79DBF1",

          "success": "#1B7963",

          "warning": "#F3DD6D",

          "error": "#F5666D",
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
    }
  },
  plugins: [
    require( "@tailwindcss/line-clamp" ),
    require( "daisyui" )
  ],
} );
