import * as base64 from "base-64";
const atob = base64.decode;

const b64DecodeUnicode = (str: string) => {
  return decodeURIComponent(
    atob(str).replace(/(.)/g, function(m: any, p: any) {
      let code = p
        .charCodeAt(0)
        .toString(16)
        .toUpperCase();
      if (code.length < 2) {
        code = "0" + code;
      }
      return "%" + code;
    })
  );
};

const base64_url_decode = (str: string) => {
  let _str = str || "";
  let output = _str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};

const decode = (token: string, options: any) => {
  if (!token) {
    return null;
  }
  options = options || {};
  let pos = options.header === true ? 0 : 1;
  return JSON.parse(base64_url_decode(token.split(".")[pos]));
};

export interface TAccessToken {
  authorizationToken: string;
  otpType: string;
  subject: string;
  applicationId: string;
  issuedAt: Date;
}

const AccessToken = (token: any): TAccessToken => {
  const _token = token;
  const _payload = { ...token, ...decode(_token.authorizationToken, {}) };

  return Object.create({
    get subject() {
      return _payload.sub;
    },
    get applicationId() {
      return _payload.appId;
    },
    get sessionId() {
      return _payload.sessionId;
    },
    get issuedAt() {
      return _payload.iat;
    },

    toString() {
      return JSON.stringify(_token);
    }
  }) as TAccessToken;
};

export default AccessToken;
