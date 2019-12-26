import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TTeam {
  description: string;
  id: number;
  name: string;
  lastUpdate: Date;
  creationDate: Date;
}

export interface ITeam extends TTeam {}

const Team = Model(
  (model: TTeam): ITeam => {
    const _team: TTeam = Object.assign({}, model);

    let create = (team: ITeam): ITeam => {
      let obj = ValidatableObject(team);
      return obj;
    };

    let team = {
      get id() {
        return _team.id;
      },
      get name() {
        return _team.name;
      },
      get description() {
        return _team.description;
      },
      get lastUpdate() {
        return _team.lastUpdate;
      },
      get creationDate() {
        return _team.creationDate;
      }
    };

    return create(team);
  }
);

export default Team;
