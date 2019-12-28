import Application from "../../Application";
import HomePresenter, {
  IHomePresenter,
  TCreateTeamPresentationModel
} from "../../presenter/main/HomePresenter";
import { IUserService } from "../../service/user/UserService";
import { IUser } from "../../model/user/User";
import { ICredentialsService } from "../../service/authentication/CredentialsService";
import { ITeamService } from "../../service/team/TeamService";
import { ITeamInvite } from "../../model/team/TeamInvite";

export default class ShowHomeInteractor {
  private application: Application;
  private output?: IHomePresenter;
  private userService: IUserService;
  private credentialsService: ICredentialsService;
  private teamService: ITeamService;

  constructor({
    application,
    userService,
    credentialsService,
    teamService
  }: any) {
    this.application = application;
    this.userService = userService;
    this.credentialsService = credentialsService;
    this.teamService = teamService;
  }

  execute() {
    this.output = HomePresenter({
      application: this.application,

      initialState: {
        userProfile: {} as IUser,
        createTeamData: {} as TCreateTeamPresentationModel,
        isCreateTeamModalVisible: false,
        userList: [],
        teamList: [],
        selectedUsers: [],
        teamInvitesForUser: [],
        teamName: "",
        projectDescription: "",
        activeTeamList: []
      }
    });

    this.credentialsService.getEmailFromStorage().then(email => {
      if (email) {
        this.userService.getUserByEmail(email).then((user: IUser) => {
          this.teamService
            .getTeamInvitesForUser(user.id)
            .then((teamInvitesForUser: ITeamInvite[]) => {
              this.output &&
                this.output.loadTeamInvitesForUser(teamInvitesForUser);
            });
          this.output && this.output.loadUserProfile(user);
        });
      }
    });

    this.userService.getUsers().then(this.output && this.output.loadUserList);

    this.credentialsService
      .getUserIdFromStorage()
      .then(userId =>
        userId
          ? this.teamService
              .getActiveTeamList(userId)
              .then(this.output && this.output.loadActiveTeamList)
          : undefined
      );

    return this.output;
  }
}
