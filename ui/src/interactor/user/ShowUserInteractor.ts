import Application from "../../Application";
import UserPresenter, {
  IUserPresenter
} from "../../presenter/user/UserPresenter";
import { IUserService } from "../../service/user/UserService";

export default class ShowUserInteractor {
  private application: Application;
  private output?: IUserPresenter;
  private userService: IUserService;

  constructor({ application, userService }: any) {
    this.application = application;
    this.userService = userService;
  }

  execute() {
    this.output = UserPresenter({
      application: this.application,
      initialState: {
        users: []
      }
    });

    this.userService.getUsers().then(this.output.loadUsers);

    return this.output;
  }
}
