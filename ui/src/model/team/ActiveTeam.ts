import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TActiveTeam {
  userId: number;
  teamId: number;
  roleName: string;
  roleKey: string;
  teamName: string;
}

export interface IActiveTeam extends TActiveTeam {}

const ActiveTeam = Model(
  (model: TActiveTeam): IActiveTeam => {
    const _activeTeam: TActiveTeam = Object.assign({}, model);

    let create = (activeTeam: IActiveTeam): IActiveTeam => {
      let obj = ValidatableObject(activeTeam);
      return obj;
    };

    let activeTeam = {
      get userId() {
        return _activeTeam.userId;
      },
      get teamId() {
        return _activeTeam.teamId;
      },
      get roleName() {
        return _activeTeam.roleName;
      },
      get roleKey() {
        return _activeTeam.roleKey;
      },
      get teamName() {
        return _activeTeam.teamName;
      }
    };

    return create(activeTeam);
  }
);

export default ActiveTeam;
