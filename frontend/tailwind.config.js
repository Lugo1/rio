/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 esto es importante para que Tailwind funcione en todos tus archivos
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00e6b8',
          hover: '#00c3a0',
          light: '#5fffe0',
          dark: '#008c76',
        },
        neutral: {
          900: '#1a1a1a',
          800: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Courier New', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
