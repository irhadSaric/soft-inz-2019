import Application from "../../Application";
import { IUserService } from "../../service/user/UserService";

export default class GetUserListByEmailInteractor {
  private application: Application;
  private userService: IUserService;

  constructor({ application, userService }: any) {
    this.application = application;
    this.userService = userService;
  }

  async execute(email: string) {
    return this.userService.getUserListByEmail(email);
  }
}
