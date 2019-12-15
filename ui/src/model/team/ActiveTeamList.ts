import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TActiveTeamList {
  description: string;
  id: number;
  name: string;
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
      get id() {
        return _activeTeamList.id;
      },
      get name() {
        return _activeTeamList.name;
      },
      get description() {
        return _activeTeamList.description;
      }
    };

    return create(activeTeamList);
  }
);

export default ActiveTeamList;
