let MD5 = require("md5");
let utils = {};

utils.md5 = function (string, key, raw) {
  if (!key) {
    if (!raw) {
      return MD5.hex_md5(string);
    } else {
      return MD5.raw_md5(string);
    }
  }
  if (!raw) {
    return MD5.hex_hmac_md5(key, string);
  } else {
    return MD5.raw_hmac_md5(key, string);
  }
};

module.exports = utils;