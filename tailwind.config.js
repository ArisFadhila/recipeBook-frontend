/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",  // penting agar Tailwind scan semua file JSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

