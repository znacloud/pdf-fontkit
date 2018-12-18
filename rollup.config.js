import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    name: 'fontkit',
    format: 'umd',
  },
  plugins: [
    localResolve(),
    json(),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', { modules: false, loose: true }]
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties']
      ],
      runtimeHelpers: true
    }),
  ],
};
