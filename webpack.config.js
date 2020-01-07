const path = require('path')

module.exports = {
  target: 'electron-main',   // https://webpack.js.org/configuration/target/#root
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js'
  },
  node: {
    __dirname: false // 调试时发现webpack会默认__dirname为根目录/,我们需要绝对路径
  }
}