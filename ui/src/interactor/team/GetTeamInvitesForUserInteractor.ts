import { ITeamService } from "../../service/team/TeamService";
import HomePresenter, {
  IHomePresenter,
  TCreateTeamPresentationModel
} from "../../presenter/main/HomePresenter";
import Application from "../../Application";

export default class GetTeamInvitesForUserInteractor {
  private application: Application;
  private output?: IHomePresenter;
  private teamService: ITeamService;

  constructor({ application, teamService }: any) {
    this.application = application;
    this.teamService = teamService;
  }

  execute(userId: number) {
    return this.teamService.getTeamInvitesForUser(userId);
  }
}
