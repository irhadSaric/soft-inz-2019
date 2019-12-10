import Application from "../../Application";
import { ITeamService } from "../../service/team/TeamService";

export default class GetActiveTeamsInteractor {
  private application: Application;
  private teamService: ITeamService;

  constructor({ application, teamService }: any) {
    this.application = application;
    this.teamService = teamService;
  }

  async execute(userId: number) {
    return this.teamService.getActiveTeams(userId); //proba
  }
}
