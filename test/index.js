import fontkit from '../src';
import assert from 'assert';
import fs from 'fs';

const openFont = (path, extra) =>
  fontkit.create(fs.readFileSync(path), extra);

describe('fontkit', function() {
  it('should open a font synchronously', function() {
    let font = openFont(__dirname + '/data/OpenSans/OpenSans-Regular.ttf');
    return assert.equal(font.constructor.name, 'TTFFont');
  });

  it('should open fonts of different formats', function() {
    let font = openFont(__dirname + '/data/OpenSans/OpenSans-Regular.ttf');
    assert.equal(font.constructor.name, 'TTFFont');

    font = openFont(__dirname + '/data/SourceSansPro/SourceSansPro-Regular.otf');
    assert.equal(font.constructor.name, 'TTFFont');

    font = openFont(__dirname + '/data/NotoSans/NotoSans.ttc');
    assert.equal(font.constructor.name, 'TrueTypeCollection');

    font = openFont(__dirname + '/data/NotoSans/NotoSans.ttc', 'NotoSans');
    assert.equal(font.constructor.name, 'TTFFont');

    font = openFont(__dirname + '/data/NotoSans/NotoSans.dfont');
    assert.equal(font.constructor.name, 'DFont');

    font = openFont(__dirname + '/data/NotoSans/NotoSans.dfont', 'NotoSans');
    assert.equal(font.constructor.name, 'TTFFont');

    font = openFont(__dirname + '/data/SourceSansPro/SourceSansPro-Regular.woff');
    assert.equal(font.constructor.name, 'WOFFFont');

    font = openFont(__dirname + '/data/SourceSansPro/SourceSansPro-Regular.woff2');
    assert.equal(font.constructor.name, 'WOFF2Font');
  });

  it('should open fonts lacking PostScript name', function() {
    let font = openFont(__dirname + '/data/Mada/Mada-Regular.subset1.ttf');
    assert.equal(font.postscriptName, null);
  });

  it('should error when opening an invalid font synchronously', function() {
    assert.throws(() => openFont(__filename), /Unknown font format/);
  });

  it('should get collection objects for ttc fonts', function() {
    let collection = openFont(__dirname + '/data/NotoSans/NotoSans.ttc');
    assert.equal(collection.constructor.name, 'TrueTypeCollection');

    let names = collection.fonts.map(f => f.postscriptName);
    assert.deepEqual(names, ['NotoSans-Bold', 'NotoSans', 'NotoSans-Italic', 'NotoSans-BoldItalic']);

    let font = collection.getFont('NotoSans-Italic');
    return assert.equal(font.postscriptName, 'NotoSans-Italic');
  });

  it('should get collection objects for dfonts', function() {
    let collection = openFont(__dirname + '/data/NotoSans/NotoSans.dfont');
    assert.equal(collection.constructor.name, 'DFont');

    let names = collection.fonts.map(f => f.postscriptName);
    assert.deepEqual(names, ['NotoSans', 'NotoSans-Bold', 'NotoSans-Italic', 'NotoSans-BoldItalic']);

    let font = collection.getFont('NotoSans-Italic');
    return assert.equal(font.postscriptName, 'NotoSans-Italic');
  });
});
