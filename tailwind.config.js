/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{jsx, js}" ],
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
    extend: {},
  },
  plugins: [ require( "daisyui" ) ],
}

