module.exports = (api) => {
  api.cache(true);

  const { MODULE_TYPE } = process.env;

  // MODULE_TYPE = 'commonjs' | 'es6'
  const modules = MODULE_TYPE === 'commonjs'  ? 'commonjs' : false;

  return {
    presets: [['@babel/preset-env', { modules }]],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties']
    ],
    env: {
      test: {
        presets: [['@babel/preset-env', { modules: 'commonjs' }]],
      },
      cover: {
        plugins: ['istanbul']
      }
    }
  };
}
