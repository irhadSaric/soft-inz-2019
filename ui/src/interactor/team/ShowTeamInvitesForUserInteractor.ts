import { ITeamService } from "../../service/team/TeamService";
import HomePresenter, {
  IHomePresenter,
  TCreateTeamPresentationModel
} from "../../presenter/main/HomePresenter";
import Application from "../../Application";
import { IUser } from "../../model/user/User";

export default class ShowTeamInvitesForUserInteractor {
  private application: Application;
  private output?: IHomePresenter;
  private teamService: ITeamService;

  constructor({ application, teamService }: any) {
    this.application = application;
    this.teamService = teamService;
  }

  /* execute(userId: number) {
    this.output = HomePresenter({
      application: this.application,
      initialState: {
        userProfile: {} as IUser, //proba
        createTeamData: {} as TCreateTeamPresentationModel,
        isCreateTeamModalVisible: false,
        createTeamValidationErrors: undefined,
        userList: [],
        teamList: [],
        selectedUsers: [],
        teamInvitesForUser: [],
        teamName: "",
        projectDescription: ""
      }
    });

    this.teamService
      .getTeamInvitesForUser(userId)
      .then(this.output.loadTeamInvitesForUser);

    return this.output;
  }
}*/

  async execute(userId: number) {
    return this.teamService.getTeamInvitesForUser(userId);
  }
}
