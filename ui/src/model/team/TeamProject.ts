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
    const _teamProject: ITeamProject = Object.assign({}, model);

    let create = (teamProject: ITeamProject): ITeamProject => {
      let obj = ValidatableObject(teamProject);
      return obj;
    };

    let teamProject = {
      get id() {
        return _teamProject.id;
      },
      set id(value) {
        _teamProject.id = value;
      },
      get name() {
        return _teamProject.name;
      },
      set name(value) {
        _teamProject.name = value;
      },
      get description() {
        return _teamProject.description;
      },
      set description(value) {
        _teamProject.description = value;
      },
      get startDate() {
        return _teamProject.startDate;
      },
      set startDate(value) {
        _teamProject.startDate = value;
      },
      get endDate() {
        return _teamProject.endDate;
      },
      set endDate(value) {
        _teamProject.endDate = value;
      },
      get teamDetails() {
        return _teamProject.teamDetails;
      },
      set teamDetails(value) {
        _teamProject.teamDetails = value;
      },
      get status() {
        return _teamProject.status;
      },
      set status(value) {
        _teamProject.status = value;
      }
    };

    return create(teamProject);
  }
);

export default TeamProject;
