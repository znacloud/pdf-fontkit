import r from '@pdf-lib/restructure';
import fs from 'fs';

const formats = [];

const fontkit = {
  logErrors: false,

  registerFormat: (format) => {
    formats.push(format);
  },

  create: (uint8ArrayFontData, postscriptName) => {
    const buffer = new Buffer.from(uint8ArrayFontData);
    for (let i = 0; i < formats.length; i++) {
      const format = formats[i];
      if (format.probe(buffer)) {
        const font = new format(new r.DecodeStream(buffer));
        if (postscriptName) {
          return font.getFont(postscriptName);
        }
        return font;
      }
    }
    throw new Error('Unknown font format');
  },
};

fontkit.openSync = function(filename, postscriptName) {
  let buffer = fs.readFileSync(filename);
  return fontkit.create(buffer, postscriptName);
};

fontkit.open = function(filename, postscriptName, callback) {
  if (typeof postscriptName === 'function') {
    callback = postscriptName;
    postscriptName = null;
  }

  fs.readFile(filename, function(err, buffer) {
    if (err) { return callback(err); }

    try {
      var font = fontkit.create(buffer, postscriptName);
    } catch (e) {
      return callback(e);
    }

    return callback(null, font);
  });

  return;
};

export default fontkit;
