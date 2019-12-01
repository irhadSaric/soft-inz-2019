import Application from "../../Application";
import { IAuthenticationService } from "../../service/authentication/AuthenticationService";
import { ICredentialsService } from "../../service/authentication/CredentialsService";

export default class LogoutInteractor {
  private application: Application;
  private authenticationService: IAuthenticationService;
  private credentialsService: ICredentialsService;

  constructor({ application, authenticationService, credentialsService }) {
    this.application = application;
    this.authenticationService = authenticationService;
    this.credentialsService = credentialsService;
  }

  async execute() {
    try {
      //await this.authenticationService.logout();
      this.credentialsService.setIsLoggedIn(false);
      window.location.replace("/login");
    } catch (error) {
      console.log(error);
    }
  }
}
