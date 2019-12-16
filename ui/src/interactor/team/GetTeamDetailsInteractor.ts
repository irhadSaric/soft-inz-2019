import { ITeamService } from "../../service/team/TeamService";

export default class GetTeamDetailsInteractor {
  private teamService: ITeamService;

  constructor({ teamService }: any) {
    this.teamService = teamService;
  }

  async execute(teamId: number) {
    return this.teamService.getTeamDetails(teamId);
  }
}
