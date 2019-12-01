import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { ICountry } from "../country/Country";

export interface TUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  country: ICountry;
  status: string;
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
      },
      get country() {
        return _user.country;
      },
      set country(value: any) {
        _user.country = value;
      },
      get status() {
        return _user.status;
      },
      set status(value) {
        _user.status = value;
      }
    };

    return create(user);
  }
);

export default User;
