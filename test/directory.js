import fontkit from '../src';
import assert from 'assert';
import fs from 'fs';

describe('metadata', function() {
  const fontData = fs.readFileSync(__dirname + '/data/OpenSans/OpenSans-Regular.ttf');
  const font = fontkit.create(fontData);

  it('decodes SFNT directory values correctly', function() {
    let dir = font.directory;
    assert.equal(dir.numTables, 19);
    assert.equal(dir.searchRange, 256);
    assert.equal(dir.entrySelector, 4);
    assert.equal(dir.rangeShift, 48);
  });

  it('numTables matches table collection', function() {
    let dir = font.directory;
    assert.equal(Object.keys(dir.tables).length, dir.numTables);
  });

});
