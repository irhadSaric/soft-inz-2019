import Application from "../../Application";
import { IUserService } from "../../service/user/UserService";

export default class GetAllUsersInteractor {
  private application: Application;
  private userService: IUserService;

  constructor({ application, userService }: any) {
    this.application = application;
    this.userService = userService;
  }

  async execute() {
    return this.userService.getUsers();
  }
}
