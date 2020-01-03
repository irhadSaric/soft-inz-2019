import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { ICountry } from "../country/Country";

export interface TActiveTeamMembers {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  country: ICountry;
  status: string;
  avatar: any;
}

export interface IActiveTeamMembers extends TActiveTeamMembers {}

const ActiveTeamMembers = Model(
  (model: TActiveTeamMembers): IActiveTeamMembers => {
    const _activeTeamMembers: TActiveTeamMembers = Object.assign({}, model);

    let create = (
      activeTeamMembers: IActiveTeamMembers
    ): IActiveTeamMembers => {
      let obj = ValidatableObject(activeTeamMembers);
      return obj;
    };

    let activeTeamMembers = {
      get id() {
        return _activeTeamMembers.id;
      },
      set id(value) {
        _activeTeamMembers.id = value;
      },
      get email() {
        return _activeTeamMembers.email;
      },
      set email(value) {
        _activeTeamMembers.email = value;
      },
      get firstName() {
        return _activeTeamMembers.firstName;
      },
      set firstName(value) {
        _activeTeamMembers.firstName = value;
      },
      get lastName() {
        return _activeTeamMembers.lastName;
      },
      set lastName(value) {
        _activeTeamMembers.lastName = value;
      },
      get password() {
        return _activeTeamMembers.password;
      },
      set password(value) {
        _activeTeamMembers.password = value;
      },
      get phone() {
        return _activeTeamMembers.phone;
      },
      set phone(value) {
        _activeTeamMembers.phone = value;
      },
      get country() {
        return _activeTeamMembers.country;
      },
      set country(value: any) {
        _activeTeamMembers.country = value;
      },
      get status() {
        return _activeTeamMembers.status;
      },
      set status(value) {
        _activeTeamMembers.status = value;
      },
      get avatar() {
        return _activeTeamMembers.avatar;
      },
      set avatar(value) {
        _activeTeamMembers.avatar = value;
      }
    };

    return create(activeTeamMembers);
  }
);

export default ActiveTeamMembers;
