import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TRole {
  id: string;
  name: string;
  key: string;
}

export interface IRole extends TRole {}

const Role = Model(
  (model: TRole): IRole => {
    const _role: TRole = Object.assign({}, model);

    let create = (role: IRole): IRole => {
      let obj = ValidatableObject(role);
      return obj;
    };

    let role = {
      get id() {
        return _role.id;
      },
      get name() {
        return _role.name;
      },
      get key() {
        return _role.key;
      }
    };

    return create(role);
  }
);

export default Role;
