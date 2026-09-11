/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './main.js'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* light — restrito à light-palette: vermelho / marinho / creme */
        paper: '#FAE3AC',
        ink: '#01344F',
        accent: '#D12128',
        /* dark — preto + vermelho, com o mesmo off-white do tema claro */
        night: '#141414',
        mutedd: '#FAE3AC',
        accentd: '#D12128',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
