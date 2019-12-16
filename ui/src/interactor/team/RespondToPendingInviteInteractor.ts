import { ITeamService } from "../../service/team/TeamService";

export default class RespondToPendingInviteInteractor {
  private teamService: ITeamService;

  constructor({ teamService }) {
    this.teamService = teamService;
  }

  async execute(userId: number, teamId: number, accept: boolean) {
    try {
      await this.teamService.respondToPendingInvite(userId, teamId, accept);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
