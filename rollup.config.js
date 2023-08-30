import terser from '@rollup/plugin-terser';

const SRC = {
  path: 'assets/js/_src/',
  name: 'main.js'
};

const OUT = {
  path: 'assets/js/',
  name: 'flow-theme.js'
};

export default {
  input: SRC.path + SRC.name,
  output: {
    file: OUT.path + OUT.name,
    format: 'iife',
    name: 'FlowTheme',
    sourcemap: true
  },
  plugins: [terser()]
};
