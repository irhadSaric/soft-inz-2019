import isaac from "isaac";

export interface IRandomValueProvider {
  getRandomString(size: number): string;
}

const RandomValueProvider = (): IRandomValueProvider => {
  let digitStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function modProd(a: number, b: number, n: number) {
    if (b === 0) return 0;
    if (b === 1) return a % n;
    return (modProd(a, (b - (b % 10)) / 10, n) * 10 + (b % 10) * a) % n;
  }

  function modPow(a: number, b: number, n: number) {
    if (b === 0) return 1;
    if (b === 1) return a % n;
    if (b % 2 === 0) {
      let c = modPow(a, b / 2, n);
      return modProd(c, c, n);
    }
    return modProd(a, modPow(a, b - 1, n), n);
  }

  function isPrime(n) {
    // Miller-Rabin primality test
    // O(k*log(n)^3) worst case, given k-accuracy
    // See: http://rosettacode.org/wiki/Miller-Rabin_primality_test#JavaScript
    if (n === 2 || n === 3 || n === 5) return true;
    if (n % 2 === 0 || n % 3 === 0 || n % 5 === 0) return false;
    if (n < 25) return true;
    for (
      var a = [2, 3, 5, 7, 11, 13, 17, 19], b = n - 1, d, t, i, x;
      b % 2 === 0;
      b /= 2
    );
    for (i = 0; i < a.length; i++) {
      x = modPow(a[i], b, n);
      if (x === 1 || x === n - 1) continue;
      for (t = true, d = b; t && d < n - 1; d *= 2) {
        x = modProd(x, x, n);
        if (x === n - 1) t = false;
      }
      if (t) return false;
    }
    return true;
  }

  function random_prime(n) {
    while (!isPrime(n)) n -= 2;
    return n;
  }

  function gcd(x, y) {
    if (!y) return x;
    return gcd(y, x % y);
  }

  function totient(n) {
    // compute Euler's totient function
    // O(sqrt(n)/3) worst case
    // See: https://en.wikipedia.org/wiki/Talk:Euler%27s_totient_function
    if (n < 2) return n;
    let phi = n;
    if (n % 2 === 0) {
      phi /= 2;
      n /= 2;
      while (n % 2 === 0) n /= 2;
    }
    if (n % 3 === 0) {
      phi -= phi / 3;
      n /= 3;
      while (n % 3 === 0) n /= 3;
    }
    let p;
    for (p = 5; p * p <= n; ) {
      if (n % p === 0) {
        phi -= phi / p;
        n /= p;
        while (n % p === 0) n /= p;
      }
      p += 2;
      if (p * p > n) break;
      if (n % p === 0) {
        phi -= phi / p;
        n /= p;
        while (n % p === 0) n /= p;
      }
    }
    if (n > 1) phi -= phi / n;
    return phi;
  }

  function seed() {
    let s = 2 * Math.floor(isaac.random() * Math.pow(2, 31)) - 1;
    if (s < 2) return seed();
    else return s;
  }

  function bbs(n) {
    // Blum Blum Shub cryptographically secure PRNG
    // See https://en.wikipedia.org/wiki/Blum_Blum_Shub
    // Max int = 2^53 === (2^26)*(2^27) -> (2^p1)*(2^p2)
    let a = new Uint32Array(n);
    let p1 = Math.floor(isaac.random() * 2) + 25; // first power, 25 or 26
    let p2 = 51 - p1; // second power
    let p = random_prime(2 * Math.floor(isaac.random() * Math.pow(2, p1)) - 1);
    let q = random_prime(2 * Math.floor(isaac.random() * Math.pow(2, p2)) - 1);
    let s = seed();
    while (
      p % 4 !== 3 ||
      q % 4 !== 3 ||
      gcd(totient(p - 1), totient(q - 1)) >= 5
    ) {
      p = random_prime(2 * Math.floor(isaac.random() * Math.pow(2, p1)) - 1);
      q = random_prime(2 * Math.floor(isaac.random() * Math.pow(2, p2)) - 1);
    }
    while (gcd(p * q, s) !== 1) s = seed();
    let i;
    for (i = n; i--; ) {
      s = Math.pow(s, 2) % (p * q);
      a[i] = s;
    }
    return a;
  }

  function shuffle(a) {
    // Fisher-Yates shuffle. Runs in O(n).
    // Takes an array as an argument.
    let i = a.length;
    let j = 0;
    let t = null;
    while (i) {
      j = Math.floor(isaac.random() * i--);
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  return {
    getRandomString(size: number) {
      if (size === 0) return "";
      size = size || 40;
      let key = "";
      let shuf_arr = shuffle(digitStr.split(""));
      let random_array = new Uint32Array(size);

      // if (rnCrypto && rnCrypto.getRandomValues) {
      //   rnCrypto.getRandomValues(random_array);
      // }
      random_array = bbs(size);
      let i;
      for (i = size; i--; ) key += shuf_arr[random_array[i] % shuf_arr.length];

      return key;
    }
  };
};

export default RandomValueProvider;
