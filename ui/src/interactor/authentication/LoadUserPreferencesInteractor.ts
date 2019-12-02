import Application from "../../Application";
import { ICredentialsService } from "../../service/authentication/CredentialsService";
import { IStore } from "../../model/runtime/state/Store";
export default class LoadUserPreferencesInteractor {
  private application: Application;
  private credentialsService: ICredentialsService;
  private store: IStore;

  constructor({ application, credentialsService, store }) {
    this.application = application;
    this.credentialsService = credentialsService;
    this.store = store;
  }

  async execute() {
    this.credentialsService.setIsLoggedIn(true);
    const userEmail = await this.credentialsService.getEmailFromStorage();
    this.store.update({ userEmail });
  }
}
