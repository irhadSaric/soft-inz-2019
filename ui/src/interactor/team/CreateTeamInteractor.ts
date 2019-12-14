import Application from "../../Application";
import { IRouter } from "../../runtime/Router";
import { ITeamService } from "../../service/team/TeamService";

export default class CreateTeamInteractor {
  private teamService: ITeamService;

  constructor({ teamService }) {
    this.teamService = teamService;
  }

  async execute(description: string, teamName: string, userId: number) {
    try {
      const response = await this.teamService.createTeam(
        description,
        teamName,
        userId
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
