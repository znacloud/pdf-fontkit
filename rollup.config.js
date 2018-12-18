import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
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
    }),
    // localResolve(),
    commonjs({
      exclude: 'src/**',
      namedExports: {
        'node_modules/unicode-trie/index.js': ['default'],

        // TODO: Remove this once create fork of restructure that exports es/
        'node_modules/restructure/index.js': ['default'],
      },
    }),
    json(),
    babel({
      babelrc: false,
      // exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { loose: true }]
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties']
      ],
      runtimeHelpers: true
    }),
    UGLIFY === 'true' && uglify(),
  ],
};
