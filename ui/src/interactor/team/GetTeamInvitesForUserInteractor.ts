import { ITeamService } from "../../service/team/TeamService";

export default class GetTeamInvitesForUserInteractor {
  private teamService: ITeamService;

  constructor({ teamService }: any) {
    this.teamService = teamService;
  }

  async execute(userId: number) {
    return this.teamService.getTeamInvitesForUser(userId);
  }
}
