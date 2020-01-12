import { IStatus } from "../status/Status";
import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IProject } from "../project/Project";

export interface TIteration {
  description: string;
  endDate: Date;
  id: number;
  name: string;
  startDate: Date;
  status: IStatus;
  project: IProject;
}

export interface IIteration extends TIteration {}

const Iteration = Model(
  (model: TIteration): IIteration => {
    const _iteration: TIteration = Object.assign({}, model);

    let create = (Iteration: IIteration): IIteration => {
      let obj = ValidatableObject(Iteration);
      return obj;
    };

    let iteration = {
      get description() {
        return _iteration.description;
      },
      set description(value) {
        _iteration.description = value;
      },
      get endDate() {
        return _iteration.endDate;
      },
      set endDate(value) {
        _iteration.endDate = value;
      },
      get id() {
        return _iteration.id;
      },
      get name() {
        return _iteration.name;
      },
      set name(value) {
        _iteration.name = value;
      },
      get status() {
        return _iteration.status;
      },
      set status(value) {
        _iteration.status = value;
      },
      get project() {
        return _iteration.project;
      },
      set project(value) {
        _iteration.project = value;
      },
      get startDate() {
        return _iteration.startDate;
      },
      set startDate(value) {
        _iteration.startDate = value;
      }
    };
    return create(iteration);
  }
);

export default Iteration;
