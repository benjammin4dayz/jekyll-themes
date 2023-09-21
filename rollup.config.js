const terser = require('@rollup/plugin-terser');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'assets/js/_src/main.js',
  output: {
    file: 'assets/js/flow-theme.js',
    format: 'iife',
    name: 'FlowTheme',
    sourcemap: !process.env.ROLLUP_WATCH ? false : 'inline'
  },
  plugins: [terser(), commonjs()]
};
