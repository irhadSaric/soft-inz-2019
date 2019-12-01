import Application from "../../Application";
import { IUserService } from "../../service/user/UserService";

export default class GetUserProfileInteractor {
  private application: Application;
  private userService: IUserService;

  constructor({ application, userService }: any) {
    this.application = application;
    this.userService = userService;
  }

  async execute(userId: number) {
    return this.userService.getUserProfile(userId);
  }
}
