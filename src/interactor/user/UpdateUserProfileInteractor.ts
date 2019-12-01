import Application from "../../Application";
import { IUserService } from "../../service/user/UserService";
import { IUser } from "../../model/user/User";

export default class UpdateUserProfileInteractor {
  private application: Application;
  private userService: IUserService;

  constructor({ application, userService }) {
    this.application = application;
    this.userService = userService;
  }

  async execute(user: IUser) {
    try {
      return await this.userService.updateUserProfile(user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
