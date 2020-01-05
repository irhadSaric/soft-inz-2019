import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { ICountry } from "../country/Country";

export interface TActiveTeamMember {
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

export interface IActiveTeamMember extends TActiveTeamMember {}

const ActiveTeamMember = Model(
  (model: TActiveTeamMember): IActiveTeamMember => {
    const _activeTeamMember: TActiveTeamMember = Object.assign({}, model);

    let create = (activeTeamMember: IActiveTeamMember): IActiveTeamMember => {
      let obj = ValidatableObject(activeTeamMember);
      return obj;
    };

    let activeTeamMember = {
      get id() {
        return _activeTeamMember.id;
      },
      set id(value) {
        _activeTeamMember.id = value;
      },
      get email() {
        return _activeTeamMember.email;
      },
      set email(value) {
        _activeTeamMember.email = value;
      },
      get firstName() {
        return _activeTeamMember.firstName;
      },
      set firstName(value) {
        _activeTeamMember.firstName = value;
      },
      get lastName() {
        return _activeTeamMember.lastName;
      },
      set lastName(value) {
        _activeTeamMember.lastName = value;
      },
      get password() {
        return _activeTeamMember.password;
      },
      set password(value) {
        _activeTeamMember.password = value;
      },
      get phone() {
        return _activeTeamMember.phone;
      },
      set phone(value) {
        _activeTeamMember.phone = value;
      },
      get country() {
        return _activeTeamMember.country;
      },
      set country(value: any) {
        _activeTeamMember.country = value;
      },
      get status() {
        return _activeTeamMember.status;
      },
      set status(value) {
        _activeTeamMember.status = value;
      },
      get avatar() {
        return _activeTeamMember.avatar;
      },
      set avatar(value) {
        _activeTeamMember.avatar = value;
      }
    };

    return create(activeTeamMember);
  }
);

export default ActiveTeamMember;
