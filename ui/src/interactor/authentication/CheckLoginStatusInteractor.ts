import Application from "../../Application";
import { ICredentialsService } from "../../service/authentication/CredentialsService";

export default class CheckLoginStatusInteractor {
  private application: Application;
  private credentialsService: ICredentialsService;

  constructor({ application, credentialsService }) {
    this.application = application;
    this.credentialsService = credentialsService;
  }

  async execute() {
    return this.credentialsService.getIsLoggedIn();
  }
}
