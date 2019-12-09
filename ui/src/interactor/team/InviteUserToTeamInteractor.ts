import { ITeamService } from "../../service/team/TeamService";

export default class InviteUserToTeamInteractor {
  // private application: Application;
  private teamService: ITeamService;
  // private router: IRouter;

  constructor({ teamService }) {
    // this.application = application;
    this.teamService = teamService;
    // this.router = router;
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
