import { AwilixContainer } from "awilix";

export default interface IModuleContainer {
  resolve<T>(name: string): T;
  registerValue(name: string, dependency: any): void;
  createScope(): AwilixContainer;
}
