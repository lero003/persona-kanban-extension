module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        personaRed: '#ff003c',
        personaBlue: '#1f51ff',
        personaYellow: '#ffea00',
        personaBlack: '#0d0d0d',
        personaWhite: '#ffffff'
      },
      fontFamily: {
        persona: ['Futura', 'Helvetica', 'sans-serif']
      }
    }
  },
  plugins: []
};