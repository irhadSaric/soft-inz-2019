export default interface ICache {
  put<T>(key: string, value: T): Promise<T>;
  get<T>(key: string, timestamp?: Date): Promise<T>;
  computeIfAbsent<T>(
    key: string,
    handler: (...args: any[]) => any,
    timestamp?: Date
  ): Promise<T>;
  invalidate(): Promise<void>;
  remove(wildcard: string): Promise<void>;
  clearAll(): Promise<void>;
}
