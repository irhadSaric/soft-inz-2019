import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TTeamDetails {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  lastUpdate: Date;
}

export interface ITeamDetails extends TTeamDetails {}

const TeamDetails = Model(
  (model: TTeamDetails): ITeamDetails => {
    const _team: TTeamDetails = Object.assign({}, model);

    let create = (team: ITeamDetails): ITeamDetails => {
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
      get creationDate() {
        return _team.creationDate;
      },
      get lastUpdate() {
        return _team.lastUpdate;
      }
    };

    return create(team);
  }
);

export default TeamDetails;
