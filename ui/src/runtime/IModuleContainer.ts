import { AwilixContainer } from "awilix";

export default interface IModuleContainer {
  teamId(arg0: number, teamId: any, id: number);
  resolve<T>(name: string): T;
  registerValue(name: string, dependency: any): void;
  createScope(): AwilixContainer;
}
