import { IStatus } from "../status/Status";
import { ITeam } from "../team/Team";
import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import CreateTeamInteractor from "../../interactor/team/CreateTeamInteractor";

export interface TProject {
  description: string;
  endDate: number;
  id: number;
  name: string;
  startDate: number;
  status: IStatus;
  team: ITeam;
}

export interface IProject extends TProject {}

const Project = Model(
  (model: TProject): IProject => {
    const _Project: TProject = Object.assign({}, model);

    let create = (Project: IProject): IProject => {
      let obj = ValidatableObject(Project);
      return obj;
    };

    let Project = {
      get description() {
        return _Project.description;
      },
      get endDate() {
        return _Project.endDate;
      },
      get id() {
        return _Project.id;
      },
      get name() {
        return _Project.name;
      },
      get status() {
        return _Project.status;
      },
      get team() {
        return _Project.team;
      },
      get startDate() {
        return _Project.startDate;
      }
    };
    return create(Project);
  }
);

export default Project;
