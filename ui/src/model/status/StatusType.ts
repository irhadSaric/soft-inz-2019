import { number } from "prop-types";
import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TStatusType {
  id: number;
  key: string;
  name: string;
}

export interface IStatusType extends TStatusType {}

const StatusType = Model(
  (model: TStatusType): IStatusType => {
    const _statusType: TStatusType = Object.assign({}, model);

    let create = (statusType: IStatusType): IStatusType => {
      let obj = ValidatableObject(statusType);
      return obj;
    };

    let statusType = {
      get id() {
        return _statusType.id;
      },
      get key() {
        return _statusType.key;
      },
      get name() {
        return _statusType.name;
      }
    };

    return create(statusType);
  }
);

export default StatusType;
