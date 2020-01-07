import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatus } from "../status/Status";

export interface TIteration {
  name: string;
  description: string;
  projectId: number;
  startDate: Date;
  endDate: Date;
  status: IStatus;
}

export interface IIteration extends TIteration {}

const Iteration = Model(
  (model: TIteration): IIteration => {
    const _iteration: TIteration = Object.assign({}, model);

    let create = (iteration: IIteration): IIteration => {
      let obj = ValidatableObject(iteration);
      return obj;
    };

    let iteration = {
      get projectId() {
        return _iteration.projectId;
      },
      set projectId(value) {
        _iteration.projectId = value;
      },
      get name() {
        return _iteration.name;
      },
      set name(value) {
        _iteration.name = value;
      },
      get description() {
        return _iteration.description;
      },
      set description(value) {
        _iteration.description = value;
      },
      get startDate() {
        return _iteration.startDate;
      },
      set startDate(value) {
        _iteration.startDate = value;
      },
      get endDate() {
        return _iteration.endDate;
      },
      set endDate(value) {
        _iteration.endDate = value;
      },
      get status() {
        return _iteration.status;
      },
      set status(value) {
        _iteration.status = value;
      }
    };

    return create(iteration);
  }
);

export default Iteration;
