import CryptographyProvider from "./CryptographyProvider";
import IOneTimePasswordGenerator from "./IOneTimePasswordGenerator";

const digitsStr =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-";
const DEFAULT_RESPONSE_LENGTH = 6;
export interface TChallengeResponsePasswordGenerator {
  securityKey: string;
  identifier: string;
  responseLength?: number;
}

const ChallengeResponsePasswordGenerator = (
  options: TChallengeResponsePasswordGenerator
): IOneTimePasswordGenerator => {
  let responseLength = options.responseLength || DEFAULT_RESPONSE_LENGTH;
  const { securityKey, identifier } = options;
  const cryptoProvider = CryptographyProvider();

  let bpe = 0;
  let mask = 0;
  let radix = mask + 1;
  let buff: any;

  let t = new Array(0);
  let s6 = t;

  for (bpe = 0; 1 << (bpe + 1) > 1 << bpe; bpe++);
  bpe >>= 1;
  mask = (1 << bpe) - 1;
  radix = mask + 1;

  function isZero(x) {
    var i;
    for (i = 0; i < x.length; i++) if (x[i]) return 0;
    return 1;
  }

  function copy(x, y) {
    var i;
    var k = x.length < y.length ? x.length : y.length;
    for (i = 0; i < k; i++) x[i] = y[i];
    for (i = k; i < x.length; i++) x[i] = 0;
  }

  function divInt(x, n) {
    var i,
      r = 0,
      s;
    for (i = x.length - 1; i >= 0; i--) {
      s = r * radix + x[i];
      x[i] = Math.floor(s / n);
      r = s % n;
    }
    return r;
  }

  function copyInt(x, n) {
    var i, c;
    for (c = n, i = 0; i < x.length; i++) {
      x[i] = c & mask;
      c >>= bpe;
    }
  }

  function int2bigInt(t, bits, minSize) {
    var i, k;
    k = Math.ceil(bits / bpe) + 1;
    k = minSize > k ? minSize : k;
    buff = new Array(k);
    copyInt(buff, t);
    return buff;
  }

  function dup(x) {
    var i;
    buff = new Array(x.length);
    copy(buff, x);
    return buff;
  }

  function multInt(x, n) {
    var i, k, c, b;
    if (!n) return;
    k = x.length;
    c = 0;
    for (i = 0; i < k; i++) {
      c += x[i] * n;
      b = 0;
      if (c < 0) {
        b = -(c >> bpe);
        c += b * radix;
      }
      x[i] = c & mask;
      c = (c >> bpe) - b;
    }
  }

  function addInt(x, n) {
    var i, k, c, b;
    x[0] += n;
    k = x.length;
    c = 0;
    for (i = 0; i < k; i++) {
      c += x[i];
      b = 0;
      if (c < 0) {
        b = -(c >> bpe);
        c += b * radix;
      }
      x[i] = c & mask;
      c = (c >> bpe) - b;
      if (!c) return; //stop carrying as soon as the carry is zero
    }
  }

  function str2bigInt(s, base, minSize = 0) {
    var d, i, j, x, y, kk;
    var k = s.length;
    if (base == -1) {
      //comma-separated list of array elements in decimal
      x = new Array(0);
      for (;;) {
        y = new Array(x.length + 1);
        for (i = 0; i < x.length; i++) y[i + 1] = x[i];
        y[0] = parseInt(s, 10);
        x = y;
        d = s.indexOf(",", 0);
        if (d < 1) break;
        s = s.substring(d + 1);
        if (s.length == 0) break;
      }
      if (x.length < minSize) {
        y = new Array(minSize);
        copy(y, x);
        return y;
      }
      return x;
    }

    x = int2bigInt(0, base * k, 0);
    for (i = 0; i < k; i++) {
      d = digitsStr.indexOf(s.substring(i, i + 1), 0);
      if (base <= 36 && d >= 36)
        //convert lowercase to uppercase if base<=36
        d -= 26;
      if (d >= base || d < 0) {
        //stop at first illegal character
        break;
      }
      multInt(x, base);
      addInt(x, d);
    }

    for (k = x.length; k > 0 && !x[k - 1]; k--); //strip off leading zeros
    k = minSize > k + 1 ? minSize : k + 1;
    y = new Array(k);
    kk = k < x.length ? k : x.length;
    for (i = 0; i < kk; i++) y[i] = x[i];
    for (; i < k; i++) y[i] = 0;
    return y;
  }

  function bigInt2str(x, base) {
    var i,
      t,
      s = "";

    if (s6.length != x.length) s6 = dup(x);
    else copy(s6, x);

    if (base == -1) {
      //return the list of array contents
      for (i = x.length - 1; i > 0; i--) s += x[i] + ",";
      s += x[0];
    } else {
      //return it in the given base
      while (!isZero(s6)) {
        t = divInt(s6, base); //t=s6 % base; s6=floor(s6/base);
        s = digitsStr.substring(t, t + 1) + s;
      }
    }
    if (s.length == 0) s = "0";
    return s;
  }

  function modInt(x, n) {
    var i,
      c = 0;
    for (i = x.length - 1; i >= 0; i--) c = (c * radix + x[i]) % n;
    return c;
  }

  function convertToString(value, maxLength) {
    var numValue = value;
    var i = 0;
    var result = "";
    while (!isZero(numValue) && i < maxLength) {
      var mod = modInt(numValue, 25);
      result = result + String.fromCharCode(65 + mod);
      divInt(numValue, 10);
      i++;
    }
    return result;
  }

  return {
    generateResponse: function(challenge) {
      var hash = cryptoProvider.SHA1(securityKey + identifier + challenge);

      var decValue = str2bigInt(hash.toString().substring(0, 32), 16);

      // mToken implementation
      // var result = bigInt2str(decValue, 10);
      // return result.substring(0, responseLength);
      var result = convertToString(decValue, responseLength);
      return result;
    }
  };
};

export default ChallengeResponsePasswordGenerator;
