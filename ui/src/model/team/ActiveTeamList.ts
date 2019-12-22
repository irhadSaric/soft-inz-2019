import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TActiveTeamList {
  userId: number;
  teamId: number; 
  roleName: string;
  roleKey: string;
  teamName: string;
}

export interface IActiveTeamList extends TActiveTeamList {}

const ActiveTeamList = Model(
  (model: TActiveTeamList): IActiveTeamList => {
    const _activeTeamList: TActiveTeamList = Object.assign({}, model);

    let create = (activeTeamList: IActiveTeamList): IActiveTeamList => {
      let obj = ValidatableObject(activeTeamList);
      return obj;
    };

    let activeTeamList = {
      get userId() {
        return _activeTeamList.userId;
      },
      get teamId() {
        return _activeTeamList.teamId;
      },
      get roleName() {
        return _activeTeamList.roleName;
      },
      get roleKey() {
        return _activeTeamList.roleKey;
      },
      get teamName() {
        return _activeTeamList.teamName;
      }
    };

    return create(activeTeamList);
  }
);

export default ActiveTeamList;
