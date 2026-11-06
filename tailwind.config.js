/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: '#69B9F7',
        grass: {
          DEFAULT: '#55B84A',
          dark: '#3D8A32',
        },
        gold: {
          DEFAULT: '#FFD447',
          dark: '#E5A817',
        },
        brick: '#D1495B',
        red: {
          DEFAULT: '#D1495B',
          dark: '#A03545',
        },
        cream: {
          DEFAULT: '#FFF5DC',
          dark: '#E8DCC8',
        },
        'border-dark': '#1E282D',
        text: '#1E282D',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        body: ['Fredoka', 'Nunito Sans', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      boxShadow: {
        sm: '2px 2px 0px #1E282D',
        md: '4px 4px 0px #1E282D',
        lg: '6px 6px 0px #1E282D',
        xl: '8px 8px 0px #1E282D',
        inner: 'inset 2px 2px 0px #1E282D',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '8': '8px',
      },
      borderRadius: {
        DEFAULT: '4px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      keyframes: {
        coinSpin: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        cloudFloat: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        blockBump: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
          '100%': { transform: 'translateY(0)' },
        },
        coinEject: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-40px) scale(0.5)', opacity: '0' },
        },
        shakeHoriz: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        questionGleam: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounceIdle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        coinSpin: 'coinSpin 1s linear infinite',
        cloudFloat: 'cloudFloat 20s ease-in-out infinite',
        cloudFloatFast: 'cloudFloat 15s ease-in-out infinite',
        blockBump: 'blockBump 0.3s ease-out',
        coinEject: 'coinEject 0.5s ease-out forwards',
        shakeHoriz: 'shakeHoriz 0.4s ease-in-out',
        questionGleam: 'questionGleam 2s ease-in-out infinite',
        bounceIdle: 'bounceIdle 2s ease-in-out infinite',
        pulseGentle: 'pulseGentle 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}