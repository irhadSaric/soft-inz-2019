import { IStatus } from "../status/Status";
import { ITeam } from "../team/Team";
import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";

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
    const _project: TProject = Object.assign({}, model);

    let create = (Project: IProject): IProject => {
      let obj = ValidatableObject(Project);
      return obj;
    };

    let project = {
      get description() {
        return _project.description;
      },
      set description(value) {
        _project.description = value;
      },
      get endDate() {
        return _project.endDate;
      },
      set endDate(value) {
        _project.endDate = value;
      },
      get id() {
        return _project.id;
      },
      get name() {
        return _project.name;
      },
      set name(value) {
        _project.name = value;
      },
      get statusId() {
        return _project.statusId;
      },
      get team() {
        return _project.team;
      },
      get startDate() {
        return _project.startDate;
      }
    };
    return create(project);
  }
);

export default Project;
