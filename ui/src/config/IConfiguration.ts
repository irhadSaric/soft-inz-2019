import { TApiConfiguration } from "./TApiConfiguration";
import { TApplicationConfiguration } from "./TApplicationConfiguration";

export interface IConfiguration {
  getApiConfiguration(): TApiConfiguration;
  getApplicationConfiguration(): TApplicationConfiguration;
}
