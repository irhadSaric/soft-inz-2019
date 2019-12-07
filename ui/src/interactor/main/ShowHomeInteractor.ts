import Application from "../../Application";
import HomePresenter, {
  IHomePresenter,
  TCreateTeamPresentationModel
} from "../../presenter/main/HomePresenter";
import { IUserService } from "../../service/user/UserService";
import { IUser } from "../../model/user/User";
import { ICredentialsService } from "../../service/authentication/CredentialsService";
import { ITeamService } from "../../service/team/TeamService";
import { ITeam } from "../../model/team/Team";

export default class ShowHomeInteractor {
  private application: Application;
  private output?: IHomePresenter;
  private userService: IUserService;
  private credentialsService: ICredentialsService; //proba
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
        userProfile: {} as IUser, //proba
        createTeamData: {} as TCreateTeamPresentationModel,
        isCreateTeamModalVisible: false,
        userList: [],
        teamList: [],
        selectedUsers: [],
        teamName: "",
        projectDescription: ""
      }
    });

    this.credentialsService.getEmailFromStorage().then(email => {
      //proba
      email &&
        this.userService
          .getUserByEmail(email)
          .then(this.output && this.output.loadUserProfile);
    });

    this.userService.getUsers().then(this.output && this.output.loadUserList);
    this.teamService
      .getAllTeams()
      .then(this.output && this.output.loadTeamList);
    return this.output;
  }
}
