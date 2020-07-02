const {resolve} = require('path')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'finder.js',
    library: 'finder'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}