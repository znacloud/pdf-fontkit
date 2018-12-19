import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import { plugin as analyze } from 'rollup-plugin-analyzer';

const { UGLIFY } = process.env;

export default {
  input: 'src/index.js',
  output: {
    name: 'fontkit',
    format: 'umd',
  },
  plugins: [
    // analyze(),
    nodeResolve({
      jsnext: true,
      preferBuiltins: false,
      // browser: true,
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
      presets: [
        ['@babel/preset-env', { loose: true }]
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties']
      ],
      runtimeHelpers: true
    }),
    globals(),
    builtins(),
    UGLIFY === 'true' && uglify(),
  ],
};
