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
  target.rollupUMD();
  target.rollupUMDMin();
};

target.generateTrieJson = () => {
  exec('babel-node src/opentype/shapers/generate-data.js');
  exec('babel-node src/opentype/shapers/gen-use.js');
  exec('babel-node src/opentype/shapers/gen-indic.js');
};

target.moveTrieJsonToRoot = () => {
  target.generateTrieJson();
  // mv('src/opentype/shapers/trie.json', 'trie.json');
  // mv('src/opentype/shapers/trieUse.json', 'trieUse.json');
  // mv('src/opentype/shapers/trieIndic.json', 'trieIndic.json');
};

target.rollupUMD = () => {
  target.moveTrieJsonToRoot();
  env.UGLIFY = false;
  exec('rollup -c rollup.config.js -o fontkit.js');
};

target.rollupUMDMin = () => {
  target.moveTrieJsonToRoot();
  env.UGLIFY = true;
  exec('rollup -c rollup.config.js -o fontkit.min.js');
};

target.clean = () => {
  rm('-f', 'fonkit.js', 'fontkit.min.js', 'trie.json', 'trieUse.json', 'trieIndic.json');
};
