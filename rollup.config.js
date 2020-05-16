import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import inject from '@rollup/plugin-inject';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
// import { plugin as analyze } from 'rollup-plugin-analyzer';
// import visualizer from 'rollup-plugin-visualizer';

const { UGLIFY, MODULE_TYPE } = process.env;

export default {
  input: 'src/index.js',
  output: {
    name: 'fontkit',
    format: MODULE_TYPE,
    strict: false,
  },
  external:
    MODULE_TYPE === 'esm'
      ? ['pako'] // pdf-lib will provide pako for us
      : [],
  plugins: [
    // analyze(),
    // visualizer({
    //   // sourcemap: true,
    //   open: true,
    // }),
    nodeResolve({
      jsnext: true,
      preferBuiltins: false,
    }),
    commonjs({
      exclude: 'src/**',
      namedExports: {
        'node_modules/unicode-trie/index.js': ['default'],
      },
    }),
    json(),
    babel({
      babelrc: false,
      presets: [['@babel/preset-env', { modules: false, loose: true }]],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties'],
      ],
      babelHelpers: 'inline',
    }),
    nodeGlobals({ buffer: false }),
    nodeBuiltins(),
    inject({
      Buffer: ['buffer', 'Buffer'],
    }),
    UGLIFY === 'true' && terser(),
  ],
};
