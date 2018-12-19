import r from '@pdf-lib/restructure';

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

export default fontkit;
