import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { ITeamDetails } from "./TeamDetails";
import { IStatus } from "../status/Status";

export interface TTeamProject {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  teamDetails: ITeamDetails;
  status: IStatus;
}

export interface ITeamProject extends TTeamProject {}

const TeamProject = Model(
  (model: TTeamProject): ITeamProject => {
    const _teamProjects: ITeamProject = Object.assign({}, model);

    let create = (teamProjects: ITeamProject): ITeamProject => {
      let obj = ValidatableObject(teamProjects);
      return obj;
    };

    let teamProjects = {
      get id() {
        return _teamProjects.id;
      },
      set id(value) {
        _teamProjects.id = value;
      },
      get name() {
        return _teamProjects.name;
      },
      set name(value) {
        _teamProjects.name = value;
      },
      get description() {
        return _teamProjects.description;
      },
      set description(value) {
        _teamProjects.description = value;
      },
      get startDate() {
        return _teamProjects.startDate;
      },
      set startDate(value) {
        _teamProjects.startDate = value;
      },
      get endDate() {
        return _teamProjects.endDate;
      },
      set endDate(value) {
        _teamProjects.endDate = value;
      },
      get teamDetails() {
        return _teamProjects.teamDetails;
      },
      set teamDetails(value) {
        _teamProjects.teamDetails = value;
      },
      get status() {
        return _teamProjects.status;
      },
      set status(value) {
        _teamProjects.status = value;
      }
    };

    return create(teamProjects);
  }
);

export default TeamProject;
