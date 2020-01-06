import { IStatus } from "../status/Status";
import { ITeam } from "../team/Team";
import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import CreateTeamInteractor from "../../interactor/team/CreateTeamInteractor";

export interface TProject {
  description: string;
  endDate: Date;
  id: number;
  name: string;
  startDate: Date;
  statusId: IStatus;
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
      set description(value) {
        _Project.description = value;
      },
      get endDate() {
        return _Project.endDate;
      },
      set endDate(value) {
        _Project.endDate = value;
      },
      get id() {
        return _Project.id;
      },
      get name() {
        return _Project.name;
      },
      set name(value) {
        _Project.name = value;
      },
      get statusId() {
        return _Project.statusId;
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
