import fs from 'fs';
import fontkit from '../src';

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
