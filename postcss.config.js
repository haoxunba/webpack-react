module.exports = {
  plugins: [
      require('precss'),
      require('autoprefixer'),
      require('postcss-pxtorem')({
        rootValue: 100,
        propWhiteList: [],
      })
  ]
}