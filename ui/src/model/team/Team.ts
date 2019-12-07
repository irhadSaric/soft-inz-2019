import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

export interface TTeam {
  //creationDate
  //logo
  description: string;
  id: number;
  name: string;
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
      // set id(value) {
      //   _team.id = value;
      // },
      get name() {
        return _team.name;
      },
      // set name(value) {
      //   _team.name = value;
      // },
      get description() {
        return _team.description;
      }
      // set description(value) {
      //   _team.description = value;
      // }
    };

    return create(team);
  }
);

export default Team;
