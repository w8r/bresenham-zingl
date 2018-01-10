const buble = require('rollup-plugin-buble');

module.exports = {
  plugins: [buble()],
  input: './index.js',
  output: {
    file:   'dist/bresenham.js',
    format: 'umd',
    name: 'bresenham',
    sourcemap: true,
    sourcemapFile: 'dist/bresenham.js.map'
  }
};
