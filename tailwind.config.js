module.exports = {
  mode: 'jit',
  purge: ['./src/components/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
    },
    fontFamily: {
      sans: ['sans-serif'],
      serif: ['serif'],
      english: ['sans-serif'],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
  corePlugins: {},
}
