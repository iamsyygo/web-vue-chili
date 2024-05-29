import JSEncrypt from 'jsencrypt';

const encrypt = function (data, publicKey) {
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(publicKey);

  const result = jsencrypt.encrypt(data);
  return result;
};
const decrypt = function (data, privateKey) {
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPrivateKey(privateKey);

  const result = jsencrypt.decrypt(data);
  return result;
};

let b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
let b64pad = '=';
function hex2b64(h) {
  let i;
  let c;
  let ret = '';
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 === h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 === h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}
let BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
function int2char(n) {
  return BI_RM.charAt(n);
}
function b64tohex(s) {
  let ret = '';
  let i;
  let k = 0; // b64 state, 0-3
  let slop = 0;
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) === b64pad) {
      break;
    }
    let v = b64map.indexOf(s.charAt(i));
    if (v < 0) {
      continue;
    }
    if (k === 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    } else if (k === 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    } else if (k === 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    } else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if (k === 1) {
    ret += int2char(slop << 2);
  }
  return ret;
}
/**
 * rsa公钥加密长字符串
 * @param str
 * @param publicKey
 * @returns {any}
 */
function encryptLong(text, publicKey) {
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(publicKey);
  let key = jsencrypt.getKey();
  let ct = '';
  // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
  // 1.获取字符串截取点
  let bytes = new Array();
  bytes.push(0);
  let byteNo = 0;
  let len = text.length;
  let c;
  let temp = 0;
  for (let i = 0; i < len; i++) {
    c = text.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10ffff) {
      // 特殊字符，如Ř，Ţ
      byteNo += 4;
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      // 中文以及标点符号
      byteNo += 3;
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      // 特殊字符，如È，Ò
      byteNo += 2;
    } else {
      // 英文以及标点符号
      byteNo += 1;
    }
    if (byteNo % 117 >= 114 || byteNo % 117 === 0) {
      if (byteNo - temp >= 114) {
        bytes.push(i);
        temp = byteNo;
      }
    }
  }
  // 2.截取字符串并分段加密
  if (bytes.length > 1) {
    for (let i = 0; i < bytes.length - 1; i++) {
      let str = void 0;
      if (i === 0) {
        str = text.substring(0, bytes[i + 1] + 1);
      } else {
        str = text.substring(bytes[i] + 1, bytes[i + 1] + 1);
      }
      let t1 = key.encrypt(str);
      ct += t1;
    }
    if (bytes[bytes.length - 1] !== text.length - 1) {
      let lastStr = text.substring(bytes[bytes.length - 1] + 1);
      ct += key.encrypt(lastStr);
    }
    return hex2b64(ct);
  }
  let t = key.encrypt(text);
  return hex2b64(t);
}
/**
 * rsa私钥解密长字符串
 * @param str
 * @param privateKey
 * @returns {any}
 */
function decryptLong(text, privateKey) {
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPrivateKey(privateKey);
  let key = jsencrypt.getKey();
  text = b64tohex(text);
  let maxLength = (key.n.bitLength() + 7) >> 3;
  try {
    if (text.length > maxLength) {
      let ct1_1 = '';
      let lt = text.match(/.{1,256}/g);
      if (lt) {
        lt.forEach(function (entry) {
          let t1 = key.decrypt(entry);
          ct1_1 += t1;
        });
      }
      return ct1_1;
    }
    let y = key.decrypt(text);
    return y;
  } catch (ex) {
    return false;
  }
}

export { decrypt, decryptLong, encrypt, encryptLong };
