SOURCES = $(shell find src)

SHELL := /bin/bash
PATH := ./node_modules/.bin:$(PATH)

all: index.js base.js

src/opentype/shapers/trie.json:
	babel-node src/opentype/shapers/generate-data.js

src/opentype/shapers/trieUse.json:
	babel-node src/opentype/shapers/gen-use.js

src/opentype/shapers/trieIndic.json:
	babel-node src/opentype/shapers/gen-indic.js

trie.json: src/opentype/shapers/trie.json
	cp src/opentype/shapers/trie.json trie.json

trieUse.json: src/opentype/shapers/trieUse.json
	cp src/opentype/shapers/trieUse.json trieUse.json

trieIndic.json: src/opentype/shapers/trieIndic.json
	cp src/opentype/shapers/trieIndic.json trieIndic.json

index.js: $(SOURCES) trie.json trieUse.json trieIndic.json
	rollup -c -m -i src/index.js -o index.js

base.js: $(SOURCES) trie.json trieUse.json trieIndic.json
	rollup -c -m -i src/base.js -o base.js

clean:
	rm -f index.js base.js trie.json trieIndic.json trieUse.json src/opentype/shapers/trie.json src/opentype/shapers/trieUse.json src/opentype/shapers/use.json src/opentype/shapers/trieIndic.json src/opentype/shapers/indic.json
