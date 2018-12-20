import r from '@pdf-lib/restructure';

const formats = [];

const fontkit = {
  logErrors: false,

  registerFormat: (format) => {
    formats.push(format);
  },

  create: (uint8ArrayFontData, postscriptName) => {
    const buffer = Buffer.from(uint8ArrayFontData);
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


// import r from '@pdf-lib/restructure';
//
// var fontkit = {};
// export default fontkit;
//
// fontkit.logErrors = false;
//
// let formats = [];
// fontkit.registerFormat = function(format) {
//   formats.push(format);
// };
//
// fontkit.create = function(buffer, postscriptName) {
//   for (let i = 0; i < formats.length; i++) {
//     let format = formats[i];
//     if (format.probe(buffer)) {
//       let font = new format(new r.DecodeStream(buffer));
//       if (postscriptName) {
//         return font.getFont(postscriptName);
//       }
//
//       return font;
//     }
//   }
//
//   throw new Error('Unknown font format');
// };
