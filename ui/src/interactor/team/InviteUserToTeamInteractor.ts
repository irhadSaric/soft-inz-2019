import { ITeamService } from "../../service/team/TeamService";

export default class InviteUserToTeamInteractor {
  private teamService: ITeamService;

  constructor({ teamService }) {
    this.teamService = teamService;
  }

  async execute(invitedUserId: number, teamId: number, userId: number) {
    try {
      await this.teamService.inviteUserToTeam(invitedUserId, teamId, userId);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
