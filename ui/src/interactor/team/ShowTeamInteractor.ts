import Application from "../../Application";
import TeamPresenter, {
  ITeamPresenter
} from "../../presenter/team/TeamPresenter";
import { ITeamDetails } from "../../model/team/TeamDetails";
import { ITeamService } from "../../service/team/TeamService";
import { ITeamProject } from "../../model/team/TeamProject";
import { IUserService } from "../../service/user/UserService";
import { ICredentialsService } from "../../service/authentication/CredentialsService";
import { IUser } from "../../model/user/User";
import { ITeamInvite } from "../../model/team/TeamInvite";

export default class ShowTeamInteractor {
  private application: Application;
  private output?: ITeamPresenter;
  private teamService: ITeamService;
  private userService: IUserService;
  private credentialsService: ICredentialsService;

  constructor({
    application,
    teamService,
    userService,
    credentialsService
  }: any) {
    this.application = application;
    this.teamService = teamService;
    this.userService = userService;
    this.credentialsService = credentialsService;
  }

  execute(teamId: number) {
    this.output = TeamPresenter({
      application: this.application,
      initialState: {
        teamDetails: {} as ITeamDetails,
        teamProjects: [],
        isEditableForm: false,
        editButtonDisabled: false,
        activeTeamMembers: [],
        userList: [],
        selectedUsers: [],
        userProfile: {} as IUser
      }
    });

    this.teamService
      .getTeamDetails(teamId)
      .then(this.output && this.output.loadTeamDetails);

    this.teamService
      .getTeamProjects(teamId)
      .then(this.output && this.output.loadTeamProjects);

    this.teamService
      .getActiveTeamMembersList(teamId)
      .then(this.output && this.output.loadActiveTeamMembersList);

    this.credentialsService.getEmailFromStorage().then(email => {
      email &&
        this.userService
          .getUserByEmail(email)
          .then(this.output && this.output.loadUserProfile);
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

    return this.output;
  }
}
