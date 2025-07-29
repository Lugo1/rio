/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)', // 👈 usamos la variable CSS
        light: 'var(--color-light)',
        muted: 'var(--color-muted)',
      },
    },
  },
  plugins: [],
};

