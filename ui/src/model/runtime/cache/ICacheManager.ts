import ICache from "./ICache";

export default interface ICacheManager {
  createCache(name: string, timeToLive?: number): ICache;
  getCache(name: string): ICache;
  invalidateCache(name: string): Promise<void>;
  clearAll(): Promise<void>;
  remove(wildcards: string[]): Promise<void>;
}
