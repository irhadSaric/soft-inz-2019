import md5 from "crypto-js/md5";
import sha1 from "crypto-js/sha1";
import Hex from "crypto-js/enc-hex";

export interface ICryptographyProvider {
  MD5(value: string | null): string;
  SHA1(value: string | null): string;
}

const CryptographyProvider = (): ICryptographyProvider => {
  return {
    MD5(value) {
      if (!value) return "";
      return md5(value).toString(Hex);
    },
    SHA1(value) {
      if (!value) return "";
      return sha1(value).toString(Hex);
    }
  };
};

export default CryptographyProvider;
