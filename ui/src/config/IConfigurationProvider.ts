export interface IConfigurationProvider {
  get(key?: string | undefined): Object;
}
