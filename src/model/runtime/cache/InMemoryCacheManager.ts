import ICacheManager from "./ICacheManager";
import InMemoryCache from "./InMemoryCache";

const InMemoryCacheManager = (): ICacheManager => {
  let _cacheManager = {};

  function create(name, timeToLive) {
    if (!_cacheManager[name]) {
      _cacheManager[name] = InMemoryCache(name, timeToLive);
    }
    return _cacheManager[name];
  }

  return {
    createCache(name, timeToLive) {
      return create(name, timeToLive);
    },
    getCache(name) {
      if (!_cacheManager[name]) {
        return create(name, null);
      }
      return _cacheManager[name];
    },
    async invalidateCache(name) {
      if (_cacheManager[name]) {
        await _cacheManager[name].invalidate();
      }
    },
    clearAll() {
      return Promise.all(
        Object.keys(_cacheManager).map(key => _cacheManager[key].clearAll())
      ).then(() => Promise.resolve());
    },
    async remove(values) {
      values.forEach(async value => {
        await Promise.all(
          Object.keys(_cacheManager).map(key =>
            _cacheManager[key].remove(value)
          )
        );
      });
    }
  };
};

export { InMemoryCacheManager };
