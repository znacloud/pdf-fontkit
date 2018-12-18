// https://github.com/shelljs/shelljs#command-reference
// https://devhints.io/shelljs
// https://github.com/shelljs/shelljs/wiki/The-make-utility
require('shelljs/make');

config.fatal = true;
config.verbose = true;

target.all = () => {
  target.clean();
  target.generateTrieJson();
  target.moveTrieJsonToRoot();
  target.compileBabel();
  target.rollupUMD();
  target.rollupUMDMin();
};

target.generateTrieJson = () => {
  env.MODULE_TYPE = 'commonjs';
  exec('babel-node src/opentype/shapers/generate-data.js');
  exec('babel-node src/opentype/shapers/gen-use.js');
  exec('babel-node src/opentype/shapers/gen-indic.js');
};

target.moveTrieJsonToRoot = () => {
  target.generateTrieJson();
  mkdir('-p', 'es/opentype/shapers/')
  mkdir('-p', 'lib/opentype/shapers/')
  cp(
    'src/opentype/shapers/trie.json',
    'src/opentype/shapers/trieUse.json',
    'src/opentype/shapers/trieIndic.json',
    'src/opentype/shapers/indic.json',
    'src/opentype/shapers/use.json',
    'es/opentype/shapers/'
  );
  cp(
    'src/opentype/shapers/trie.json',
    'src/opentype/shapers/trieUse.json',
    'src/opentype/shapers/trieIndic.json',
    'src/opentype/shapers/indic.json',
    'src/opentype/shapers/use.json',
    'lib/opentype/shapers/'
  );
};

target.compileBabel = () => {
  target.moveTrieJsonToRoot();
  env.MODULE_TYPE = 'es6';
  exec(`babel --out-dir es src/`);
  env.MODULE_TYPE = 'commonjs';
  exec(`babel --out-dir lib src/`);
}

target.rollupUMD = () => {
  target.moveTrieJsonToRoot();
  env.UGLIFY = false;
  exec('rollup -c rollup.config.js -o dist/fontkit.js');
};

target.rollupUMDMin = () => {
  target.moveTrieJsonToRoot();
  env.UGLIFY = true;
  exec('rollup -c rollup.config.js -o dist/fontkit.min.js');
};

target.clean = () => {
  rm(
    '-rf',
    'lib',
    'es',
    'dist',
    'src/opentype/shapers/trie.json',
    'src/opentype/shapers/trieUse.json',
    'src/opentype/shapers/trieIndic.json',
    'src/opentype/shapers/indic.json',
    'src/opentype/shapers/use.json',
  );
};
