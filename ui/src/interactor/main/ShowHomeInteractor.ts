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
import { isUserWhitespacable } from "@babel/types";

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
        userProfile: {} as IUser, //proba
        createTeamData: {} as TCreateTeamPresentationModel,
        isCreateTeamModalVisible: false,
        userList: [],
        teamList: [],
        selectedUsers: [],
        teamInvitesForUser: [],
        teamName: "",
        projectDescription: ""
      }
    });

    this.credentialsService.getEmailFromStorage().then(email => {
      //proba
      email &&
        this.userService.getUserByEmail(email).then(user => {
          user &&
            this.teamService
              .getTeamInvitesForUser(user.id)
              .then(this.output && this.output.loadTeamInvitesForUser);
        });
    });

    this.credentialsService.getEmailFromStorage().then(email => {
      //proba
      email &&
        this.userService
          .getUserByEmail(email)
          .then(this.output && this.output.loadUserProfile);
    });

    /* this.credentialsService.getEmailFromStorage().then(email => {
      //proba
      email &&
        this.userService.getUserByEmail(email).then(user => {
          user &&
            this.teamService.getTeamInvitesForUser(user.id).then(teams => {
              console.log(teams);
            });
        });
    }); */

    this.userService.getUsers().then(this.output && this.output.loadUserList);

    return this.output;
  }
}
