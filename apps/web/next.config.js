const withTM = require('next-transpile-modules')(['ui'])
const path = require('path')

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
})
