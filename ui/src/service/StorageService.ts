export interface IStorageService {
  save(key: string, value: any): void;
  get(key: string): Promise<any>;
  remove(key: string): Promise<void>;
  clear(): void;
}

const localStorage = window.localStorage;

const isObject = value => {
  return value && (value[0] === "{" || value[0] === "[");
};

const LocalStoragePlugin = () => {
  return Object.create({
    getAllKeys() {
      return Object.keys(localStorage);
    },
    save(key, value) {
      let isObject = typeof value === "object";
      localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
      return Promise.resolve(value);
    },
    load(key) {
      let value = localStorage.getItem(key);
      if (isObject(value)) {
        value = value && JSON.parse(value);
      }
      return Promise.resolve(value);
    },
    remove(key) {
      return Promise.resolve(localStorage.removeItem(key));
    },
    clear() {
      return Promise.resolve(localStorage.clear());
    }
  });
};

const StorageService = (): IStorageService => {
  const _storage = LocalStoragePlugin();
  return {
    async save(key: string, value: any) {
      return _storage.save(key, value);
    },
    async get(key: string) {
      return _storage.load(key);
    },
    async remove(key: string) {
      await _storage.remove(key);
    },
    clear() {
      _storage.clearMap();
    }
  };
};

export default StorageService;
