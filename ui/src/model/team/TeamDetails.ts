import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TTeamDetails {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  lastUpdated: Date;
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
      set id(value) {
        _team.id = value;
      },
      get name() {
        return _team.name;
      },
      set name(value) {
        _team.name = value;
      },
      get description() {
        return _team.description;
      },
      set description(value) {
        _team.description = value;
      },
      get creationDate() {
        return _team.creationDate;
      },
      set creationDate(value) {
        _team.creationDate = value;
      },
      get lastUpdated() {
        return _team.lastUpdated;
      },
      set lastUpdated(value) {
        _team.lastUpdated = value;
      }
    };

    return create(team);
  }
);

export default TeamDetails;
