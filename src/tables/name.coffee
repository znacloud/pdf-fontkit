r = require 'restructure'

NameRecord = new r.Struct
  platformID: r.uint16
  encodingID: r.uint16
  languageID: r.uint16
  nameID:     r.uint16
  length:     r.uint16
  string:     new r.Pointer(r.uint16, new r.String('length', -> ENCODINGS[@platformID][@encodingID]), type: 'parent', relativeTo: 'stringOffset')
  
LangTagRecord = new r.Struct
  length:  r.uint16
  tag:     new r.Pointer(r.uint16, new r.String('length', 'utf16be'), type: 'parent', relativeTo: 'stringOffset')
  
module.exports = new r.VersionedStruct r.uint16,
  0:
    count:          r.uint16
    stringOffset:   r.uint16
    records:        new r.Array(NameRecord, 'count')
  1:
    count:          r.uint16
    stringOffset:   r.uint16
    records:        new r.Array(NameRecord, 'count')
    langTagCount:   r.uint16
    langTags:       new r.Array(LangTagRecord, 'langTagCount')

NAMES = [
  'copyright'
  'fontFamily'
  'fontSubfamily'
  'uniqueSubfamily'
  'fullName'
  'version'
  'postscriptName' # Note: A font may have only one PostScript name and that name must be ASCII.
  'trademark'
  'manufacturer'
  'designer'
  'description'
  'vendorURL'
  'designerURL'
  'license'
  'licenseURL'
  null # reserved
  'preferredFamily'
  'preferredSubfamily'
  'compatibleFull'
  'sampleText'
  'postscriptCIDFontName'
  'wwsFamilyName'
  'wwsSubfamilyName'
]

ENCODINGS = [
  # unicode
  ['utf16be', 'utf16be', 'utf16be', 'utf16be', 'utf16be', 'utf16be']
  
  # macintosh
  # euc-kr or koren
  # gb_2312-80 or chinese
  # iso-8859-6 or arabic
  # iso-8859-8 or hebrew
  # iso-8859-7 or greek
  # iso-8859-5 or cyrillic WRONG I THINK
  # https://github.com/ashtuchkin/iconv-lite
  ['macintosh', 'shift_jis', 'big5', 'euc-kr', 'iso-8859-6', 'iso-8859-8', 
   'iso-8859-7', 'iso-8859-5', 'symbol??', 'Devanagari', 'Gurmukhi', 'Gujarati',
   'Oriya', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Sinhalese',
   'Burmese', 'Khmer', 'tis-620??', 'Laotian', 'Georgian', 'Armenian', 'gb_2312-80', 
   'Tibetan', 'Mongolian', 'Geez', 'Slavic', 'Vietnamese', 'Sindhi']
  
  # ISO (deprecated)
  ['ascii']
  
  # windows
  ['symbol???', 'utf16be', 'shift_jis', 'gb18030', 'big5', 'euc-kr', 'johab???', null, null, null, 'ucs-4??']
]

LANGUAGES = [
  # unicode
  []
  
  { # macintosh
     0: "English",                          59: "Pashto",
     1: "French",                           60: "Kurdish",
     2: "German",                           61: "Kashmiri",
     3: "Italian",                          62: "Sindhi",
     4: "Dutch",                            63: "Tibetan",
     5: "Swedish",                          64: "Nepali",
     6: "Spanish",                          65: "Sanskrit",
     7: "Danish",                           66: "Marathi",
     8: "Portuguese",                       67: "Bengali",
     9: "Norwegian",                        68: "Assamese",
    10: "Hebrew",                           69: "Gujarati",
    11: "Japanese",                         70: "Punjabi",
    12: "Arabic",                           71: "Oriya",
    13: "Finnish",                          72: "Malayalam",
    14: "Greek",                            73: "Kannada",
    15: "Icelandic",                        74: "Tamil",
    16: "Maltese",                          75: "Telugu",
    17: "Turkish",                          76: "Sinhalese",
    18: "Croatian",                         77: "Burmese",
    19: "Chinese (Traditional)",            78: "Khmer",
    20: "Urdu",                             79: "Lao",
    21: "Hindi",                            80: "Vietnamese",
    22: "Thai",                             81: "Indonesian",
    23: "Korean",                           82: "Tagalong",
    24: "Lithuanian",                       83: "Malay (Roman script)",
    25: "Polish",                           84: "Malay (Arabic script)",
    26: "Hungarian",                        85: "Amharic",
    27: "Estonian",                         86: "Tigrinya",
    28: "Latvian",                          87: "Galla",
    29: "Sami",                             88: "Somali",
    30: "Faroese",                          89: "Swahili",
    31: "Farsi/Persian",                    90: "Kinyarwanda/Ruanda",
    32: "Russian",                          91: "Rundi",
    33: "Chinese (Simplified)",             92: "Nyanja/Chewa",
    34: "Flemish",                          93: "Malagasy",
    35: "Irish Gaelic",                     94: "Esperanto",
    36: "Albanian",                         128: "Welsh",
    37: "Romanian",                         129: "Basque",
    38: "Czech",                            130: "Catalan",
    39: "Slovak",                           131: "Latin",
    40: "Slovenian",                        132: "Quenchua",
    41: "Yiddish",                          133: "Guarani",
    42: "Serbian",                          134: "Aymara",
    43: "Macedonian",                       135: "Tatar",
    44: "Bulgarian",                        136: "Uighur",
    45: "Ukrainian",                        137: "Dzongkha",
    46: "Byelorussian",                     138: "Javanese (Roman script)",
    47: "Uzbek",                            139: "Sundanese (Roman script)",
    48: "Kazakh",                           140: "Galician",
    49: "Azerbaijani (Cyrillic script)",    141: "Afrikaans",
    50: "Azerbaijani (Arabic script)",      142: "Breton",
    51: "Armenian",                         143: "Inuktitut",
    52: "Georgian",                         144: "Scottish Gaelic",
    53: "Moldavian",                        145: "Manx Gaelic",
    54: "Kirghiz",                          146: "Irish Gaelic (with dot above)",
    55: "Tajiki",                           147: "Tongan",
    56: "Turkmen",                          148: "Greek (polytonic)",
    57: "Mongolian (Mongolian script)",     149: "Greenlandic",
    58: "Mongolian (Cyrillic script)",      150: "Azerbaijani (Roman script)"                           
  }
  
  # ISO (deprecated)
  []
  
  { # windows
    0x0436: "Afrikaans",               0x0453: "Khmer",
    0x041C: "Albanian",                0x0486: "K'iche",
    0x0484: "Alsatian",                0x0487: "Kinyarwanda",
    0x045E: "Amharic",                 0x0441: "Kiswahili",
    0x1401: "Arabic",                  0x0457: "Konkani",
    0x3C01: "Arabic",                  0x0412: "Korean",
    0x0C01: "Arabic",                  0x0440: "Kyrgyz",
    0x0801: "Arabic",                  0x0454: "Lao",
    0x2C01: "Arabic",                  0x0426: "Latvian",
    0x3401: "Arabic",                  0x0427: "Lithuanian",
    0x3001: "Arabic",                  0x082E: "Lower Sorbian",
    0x1001: "Arabic",                  0x046E: "Luxembourgish",
    0x1801: "Arabic",                  0x042F: "Macedonian (FYROM)",
    0x2001: "Arabic",                  0x083E: "Malay",
    0x4001: "Arabic",                  0x043E: "Malay",
    0x0401: "Arabic",                  0x044C: "Malayalam",
    0x2801: "Arabic",                  0x043A: "Maltese",
    0x1C01: "Arabic",                  0x0481: "Maori",
    0x3801: "Arabic",                  0x047A: "Mapudungun",
    0x2401: "Arabic",                  0x044E: "Marathi",
    0x042B: "Armenian",                0x047C: "Mohawk",
    0x044D: "Assamese",                0x0450: "Mongolian (Cyrillic)",
    0x082C: "Azeri (Cyrillic)",        0x0850: "Mongolian (Traditional)",
    0x042C: "Azeri (Latin)",           0x0461: "Nepali",
    0x046D: "Bashkir",                 0x0414: "Norwegian (Bokmal)",
    0x042D: "Basque",                  0x0814: "Norwegian (Nynorsk)",
    0x0423: "Belarusian",              0x0482: "Occitan",
    0x0845: "Bengali",                 0x0448: "Odia (formerly Oriya)",
    0x0445: "Bengali",                 0x0463: "Pashto",
    0x201A: "Bosnian (Cyrillic)",      0x0415: "Polish",
    0x141A: "Bosnian (Latin)",         0x0416: "Portuguese",
    0x047E: "Breton",                  0x0816: "Portuguese",
    0x0402: "Bulgarian",               0x0446: "Punjabi",
    0x0403: "Catalan",                 0x046B: "Quechua",
    0x0C04: "Chinese",                 0x086B: "Quechua",
    0x1404: "Chinese",                 0x0C6B: "Quechua",
    0x0804: "Chinese",                 0x0418: "Romanian",
    0x1004: "Chinese",                 0x0417: "Romansh",
    0x0404: "Chinese",                 0x0419: "Russian",
    0x0483: "Corsican",                0x243B: "Sami (Inari)",
    0x041A: "Croatian",                0x103B: "Sami (Lule)",
    0x101A: "Croatian (Latin)",        0x143B: "Sami (Lule)",
    0x0405: "Czech",                   0x0C3B: "Sami (Northern)",
    0x0406: "Danish",                  0x043B: "Sami (Northern)",
    0x048C: "Dari",                    0x083B: "Sami (Northern)",
    0x0465: "Divehi",                  0x203B: "Sami (Skolt)",
    0x0813: "Dutch",                   0x183B: "Sami (Southern)",
    0x0413: "Dutch",                   0x1C3B: "Sami (Southern)",
    0x0C09: "English",                 0x044F: "Sanskrit",
    0x2809: "English",                 0x1C1A: "Serbian (Cyrillic)",
    0x1009: "English",                 0x0C1A: "Serbian (Cyrillic)",
    0x2409: "English",                 0x181A: "Serbian (Latin)",
    0x4009: "English",                 0x081A: "Serbian (Latin)",
    0x1809: "English",                 0x046C: "Sesotho sa Leboa",
    0x2009: "English",                 0x0432: "Setswana",
    0x4409: "English",                 0x045B: "Sinhala",
    0x1409: "English",                 0x041B: "Slovak",
    0x3409: "English",                 0x0424: "Slovenian",
    0x4809: "English",                 0x2C0A: "Spanish",
    0x1C09: "English",                 0x400A: "Spanish",
    0x2C09: "English",                 0x340A: "Spanish",
    0x0809: "English",                 0x240A: "Spanish",
    0x0409: "English",                 0x140A: "Spanish",
    0x3009: "English",                 0x1C0A: "Spanish",
    0x0425: "Estonian",                0x300A: "Spanish",
    0x0438: "Faroese",                 0x440A: "Spanish",
    0x0464: "Filipino",                0x100A: "Spanish",
    0x040B: "Finnish",                 0x480A: "Spanish",
    0x080C: "French",                  0x080A: "Spanish",
    0x0C0C: "French",                  0x4C0A: "Spanish",
    0x040C: "French",                  0x180A: "Spanish",
    0x140c: "French",                  0x3C0A: "Spanish",
    0x180C: "French",                  0x280A: "Spanish",
    0x100C: "French",                  0x500A: "Spanish",
    0x0462: "Frisian",                 0x0C0A: "Spanish (Modern Sort)",
    0x0456: "Galician",                0x040A: "Spanish (Traditional Sort)",
    0x0437: "Georgian",                0x540A: "Spanish",
    0x0C07: "German",                  0x380A: "Spanish",
    0x0407: "German",                  0x200A: "Spanish",
    0x1407: "German",                  0x081D: "Sweden",
    0x1007: "German",                  0x041D: "Swedish",
    0x0807: "German",                  0x045A: "Syriac",
    0x0408: "Greek",                   0x0428: "Tajik (Cyrillic)",
    0x046F: "Greenlandic",             0x085F: "Tamazight (Latin)",
    0x0447: "Gujarati",                0x0449: "Tamil",
    0x0468: "Hausa (Latin)",           0x0444: "Tatar",
    0x040D: "Hebrew",                  0x044A: "Telugu",
    0x0439: "Hindi",                   0x041E: "Thai",
    0x040E: "Hungarian",               0x0451: "Tibetan",
    0x040F: "Icelandic",               0x041F: "Turkish",
    0x0470: "Igbo",                    0x0442: "Turkmen",
    0x0421: "Indonesian",              0x0480: "Uighur",
    0x045D: "Inuktitut",               0x0422: "Ukrainian",
    0x085D: "Inuktitut (Latin)",       0x042E: "Upper Sorbian",
    0x083C: "Irish",                   0x0420: "Urdu",
    0x0434: "isiXhosa",                0x0843: "Uzbek (Cyrillic)",
    0x0435: "isiZulu",                 0x0443: "Uzbek (Latin)",
    0x0410: "Italian",                 0x042A: "Vietnamese",
    0x0810: "Italian",                 0x0452: "Welsh",
    0x0411: "Japanese",                0x0488: "Wolof",
    0x044B: "Kannada",                 0x0485: "Yakut",
    0x043F: "Kazakh",                  0x0478: "Yi",
    0x046A: "Yoruba"
  }
]
  
module.exports.process = (stream) ->
  records = {}
  for record in @records
    # find out what language this is for
    language = LANGUAGES[record.platformID][record.languageID]
    
    if not language? and @langTags? and record.languageID >= 0x8000
      language = @langTags[record.languageID - 0x8000].tag
    
    language ?= record.platformID + '-' + record.languageID
    
    # check for reserved nameIDs
    # if 20 <= record.nameID <= 255
    #     throw new Error "Reserved nameID #{record.nameID}"
    
    # if the nameID is >= 256, it is a font feature record (AAT)
    if record.nameID >= 256
      records.fontFeatures ?= {}
      feature = records.fontFeatures[language] ?= {}
      feature[record.nameID] = record.string
    else
      key = NAMES[record.nameID] || record.nameID
      records[key] ?= {}
      records[key][language] = record.string
    
  @records = records
  
module.exports.preEncode = ->
  return if Array.isArray @records
  @version = 0
  
  records = []
  for key, val of @records
    continue if key is 'fontFeatures'
    
    records.push
      platformID: 3
      encodingID: 1
      languageID: 0x409
      nameID: NAMES.indexOf(key)
      length: Buffer.byteLength(val.English, 'utf16le')
      string: val.English
      
    if key is 'postscriptName'
      records.push
        platformID: 1
        encodingID: 0
        languageID: 0
        nameID: NAMES.indexOf(key)
        length: val.English.length
        string: val.English
      
  @records = records
  @count = records.length
  @stringOffset = module.exports.size(this, null, false)