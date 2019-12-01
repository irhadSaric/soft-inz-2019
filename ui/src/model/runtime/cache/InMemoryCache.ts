import CryptographyProvider from "../../security/CryptographyProvider";
import ICache from "./ICache";

const TIME_TO_LIVE_MS = 30000;
const MAX_CACHE_SIZE = 250;
const NUM_LRU_CANDIDATES = 5;

const InMemoryCache = (name, timeToLive?, maxCacheSize?): ICache => {
  const _cryptographyProvider = CryptographyProvider();

  function immutable(o) {
    return JSON.parse(JSON.stringify(o));
  }

  let _cache = {};
  let _ttl = {};
  let _name = name;
  let _maxCacheSize = maxCacheSize || MAX_CACHE_SIZE;
  let _timeToLive = timeToLive !== undefined ? timeToLive : TIME_TO_LIVE_MS;

  function encodeKey(key) {
    return `${_cryptographyProvider.MD5(_name)}-${key}`;
  }

  function getOldestKeys(length) {
    var sortedKeys = Object.keys(_ttl).sort((a, b) => _ttl[a] - _ttl[b]);
    return sortedKeys.slice(0, length);
  }

  function purgeCache(_timestamp) {
    let staleKeys: string[] = [];
    Object.keys(_cache).forEach(key => {
      if (isCacheStale(_timestamp, _cache[key].timestamp)) {
        staleKeys.push(key);
      }
    });

    let purgeCount =
      Object.keys(_cache).length - _maxCacheSize + NUM_LRU_CANDIDATES;
    let oldKeys = getOldestKeys(purgeCount);
    staleKeys = [...staleKeys, ...oldKeys];

    staleKeys.forEach(key => {
      delete _cache[key];
      delete _ttl[key];
    });
  }

  function isCacheStale(currentTime, cacheTimestamp) {
    return _timeToLive === -1
      ? false
      : currentTime - cacheTimestamp > _timeToLive;
  }

  async function storeValue(key, value) {
    let _key = encodeKey(key);
    let _timestamp = new Date().getTime();
    if (Object.keys(_cache).length > _maxCacheSize) {
      purgeCache(_timestamp);
    }
    _cache[_key] = {
      timestamp: _timestamp,
      value: immutable(value)
    };
    _ttl[_key] = _timestamp;
    return Promise.resolve(value);
  }

  function deleteCachedValue(key) {
    delete _cache[key];
    delete _ttl[key];
  }

  function getValue(key, timestamp) {
    let _key = encodeKey(key);
    if (_cache[_key]) {
      let canReadFromCache =
        !timestamp || !isCacheStale(timestamp, _cache[_key].timestamp);
      if (canReadFromCache) {
        return Promise.resolve(_cache[_key].value);
      } else {
        delete _cache[_key];
        delete _ttl[_key];
      }
    }
    return Promise.resolve(null);
  }

  return Object.create({
    put(key, value) {
      return storeValue(key, value);
    },
    get(key, timestamp = null) {
      return getValue(key, timestamp);
    },
    computeIfAbsent(key, handler, timestamp = null) {
      let _key = encodeKey(key);
      if (!_cache[_key]) {
        return handler();
      }
      return getValue(key, timestamp).then(value => {
        if (value === null) {
          return handler();
        } else {
          return value;
        }
      });
    },
    invalidate() {
      Object.keys(_cache).forEach(deleteCachedValue);
      return Promise.resolve();
    },
    remove(value) {
      Object.keys(_cache).forEach(function(key) {
        if (key.indexOf(value) !== -1) {
          deleteCachedValue(key);
        }
      });
    },
    clearAll() {
      Object.keys(_cache).map(key => {
        delete _cache[key];
        return "";
      });
      return Promise.resolve();
    }
  });
};

export default InMemoryCache;
