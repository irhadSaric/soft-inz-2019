import Application from "../../Application";
import { ITeamService } from "../../service/team/TeamService";
import { ITeamDetails } from "../../model/team/TeamDetails";

export default class UpdateTeamDetailsInteractor {
  private application: Application;
  private teamService: ITeamService;

  constructor({ application, teamService }) {
    this.application = application;
    this.teamService = teamService;
  }

  async execute(team: ITeamDetails) {
    try {
      return await this.teamService.updateTeamDetails(team);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
