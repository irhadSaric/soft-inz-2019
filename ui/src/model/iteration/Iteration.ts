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
    const _Iteration: TIteration = Object.assign({}, model);

    let create = (Iteration: IIteration): IIteration => {
      let obj = ValidatableObject(Iteration);
      return obj;
    };

    let Iteration = {
      get description() {
        return _Iteration.description;
      },
      set description(value) {
        _Iteration.description = value;
      },
      get endDate() {
        return _Iteration.endDate;
      },
      set endDate(value) {
        _Iteration.endDate = value;
      },
      get id() {
        return _Iteration.id;
      },
      get name() {
        return _Iteration.name;
      },
      set name(value) {
        _Iteration.name = value;
      },
      get status() {
        return _Iteration.status;
      },
      get project() {
        return _Iteration.project;
      },
      get startDate() {
        return _Iteration.startDate;
      }
    };
    return create(Iteration);
  }
);

export default Iteration;
