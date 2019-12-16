import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatusType } from "./StatusType";

export interface TStatus {
  id: number;
  key: string;
  name: string;
  statusType: IStatusType;
}

export interface IStatus extends TStatus {}

const Status = Model(
  (model: TStatus): IStatus => {
    const _status: TStatus = Object.assign({}, model);

    let create = (team: IStatus): IStatus => {
      let obj = ValidatableObject(team);
      return obj;
    };

    let status = {
      get id() {
        return _status.id;
      },
      get key() {
        return _status.key;
      },
      get name() {
        return _status.name;
      },
      get statusType() {
        return _status.statusType;
      }
    };

    return create(status);
  }
);

export default Status;
