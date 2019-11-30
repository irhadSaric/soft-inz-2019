import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}

export interface IUser extends TUser {}

const User = Model(
  (model: TUser): IUser => {
    const _user: TUser = Object.assign({}, model);

    let create = (user: IUser): IUser => {
      let obj = ValidatableObject(user);
      return obj;
    };

    let user = {
      get id() {
        return _user.id;
      },
      set id(value) {
        _user.id = value;
      },
      get email() {
        return _user.email;
      },
      set email(value) {
        _user.email = value;
      },
      get firstName() {
        return _user.firstName;
      },
      set firstName(value) {
        _user.firstName = value;
      },
      get lastName() {
        return _user.lastName;
      },
      set lastName(value) {
        _user.lastName = value;
      },
      get password() {
        return _user.password;
      },
      set password(value) {
        _user.password = value;
      },
      get phone() {
        return _user.phone;
      },
      set phone(value) {
        _user.phone = value;
      }
    };

    return create(user);
  }
);

export default User;
