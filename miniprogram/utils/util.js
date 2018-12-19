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

utils.formatTime = function (time, type) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let result;
  switch (type) {
    case 1:
      result = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
      break
  }
  return result
}

module.exports = utils;