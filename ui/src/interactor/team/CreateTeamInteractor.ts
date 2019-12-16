import { ITeamService } from "../../service/team/TeamService";

export default class CreateTeamInteractor {
  private teamService: ITeamService;

  constructor({ teamService }) {
    this.teamService = teamService;
  }

  async execute(description: string, teamName: string, userId: number) {
    try {
      return this.teamService.createTeam(description, teamName, userId);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
