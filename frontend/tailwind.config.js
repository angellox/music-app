module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Yanone Kaffeesatz']
      },
      minHeight: {
        '7/8': '85px'
      },
      colors: {
        'cream': {
          500: '#CA7A8B',
          600: '#B4445C',
          700: '#B0434E'
        }
      }
    }
  },
  plugins: [],
}
