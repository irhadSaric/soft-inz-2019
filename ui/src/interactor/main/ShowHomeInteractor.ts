import Application from "../../Application";
import HomePresenter, {
  IHomePresenter
} from "../../presenter/main/HomePresenter";
import { IUserService } from "../../service/user/UserService";

export default class ShowHomeInteractor {
  private application: Application;
  private output?: IHomePresenter;
  private userService: IUserService;

  constructor({ application, userService }: any) {
    this.application = application;
    this.userService = userService;
  }

  execute() {
    this.output = HomePresenter({
      application: this.application,

      initialState: {
        isCreateTeamModalVisible: false,
        userList: [],
        selectedUsers: [],
        teamName: "",
        projectDescription: ""
      }
    });

    this.userService.getUsers().then(this.output && this.output.loadUserList);

    return this.output;
  }
}
