// https://github.com/shelljs/shelljs#command-reference
// https://devhints.io/shelljs
// https://github.com/shelljs/shelljs/wiki/The-make-utility
require('shelljs/make');

config.fatal = true;
config.verbose = true;

target.all = () => {
  // target.clean();
  // target.generateTrieJson();
  // target.moveTrieJsonToRoot();
  target.rollupCjs();
};

target.generateTrieJson = () => {
  exec('babel-node src/opentype/shapers/generate-data.js');
  exec('babel-node src/opentype/shapers/gen-use.js');
  exec('babel-node src/opentype/shapers/gen-indic.js');
};

target.moveTrieJsonToRoot = () => {
  target.generateTrieJson();
  mv('src/opentype/shapers/trie.json', 'trie.json');
  mv('src/opentype/shapers/trieUse.json', 'trieUse.json');
  mv('src/opentype/shapers/trieIndic.json', 'trieIndic.json');
};

target.rollupCjs = () => {
  // target.moveTrieJsonToRoot();
  exec('rollup -c rollup.config.js -o index.js');
};

target.clean = () => {
  rm('-f', 'index.js', 'trie.json', 'trieUse.json', 'trieIndic.json', )
};
