/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'mobile-light' : "url('/assets/bg-mobile-light.jpg')",
        'mobile-dark' : "url('/assets/bg-mobile-dark.jpg')",
        'desktop-light' : "url('/assets/bg-desktop-light.jpg')",
        'desktop-dark' : "url('/assets/bg-desktop-light.jpg')",
      },
      colors: {
        'bright-blue': "hsl(220, 98%, 61%)",
        'light-gray': "hsl(0, 0%, 98%)",
        'light-grayish-blue': "hsl(236, 33%, 92%)",
        'grayish-blue': "hsl(233, 11%, 84%)",
        'dark-grayish-blue': "hsl(236, 9%, 61%)",
        'very-dark-grayish-blue': "hsl(235, 19%, 35%)",
      },
      
      fontFamily: {
        Josefin: ["Josefin Sans", "sans-serif"]
      },

      screens: {
        sm: "350px",
        md: "668px",
        dark: {
          raw: "(prefers-color-scheme: dark)"
        },
      }
    },

  },
  plugins: [
    require('tailwindcss-dark-mode')(),
  ],
}

