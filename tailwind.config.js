// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ['./src/**/*.js'],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        dancingScript: ['Dancing Script', 'cursive'],
      },
    },
  },
  variants: { backgroundColor: ['active'] },
  // https://github.com/tailwindcss/custom-forms
  plugins: [require('@tailwindcss/custom-forms')],
}
