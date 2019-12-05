import Application from "../../Application";
import HomePresenter, {
  IHomePresenter,
  TCreateTeamPresentationModel
} from "../../presenter/main/HomePresenter";
import { IUserService } from "../../service/user/UserService";
import { IUser } from "../../model/user/User";
import { ICredentialsService } from "../../service/authentication/CredentialsService";

export default class ShowHomeInteractor {
  private application: Application;
  private output?: IHomePresenter;
  private userService: IUserService;
  private credentialsService: ICredentialsService; //proba

  constructor({ application, userService, credentialsService }: any) {
    this.application = application;
    this.userService = userService;
    this.credentialsService = credentialsService;
  }

  execute() {
    this.output = HomePresenter({
      application: this.application,

      initialState: {
        userProfile: {} as IUser, //proba
        createTeamData: {} as TCreateTeamPresentationModel,
        isCreateTeamModalVisible: false,
        userList: [],
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

    return this.output;
  }
}
