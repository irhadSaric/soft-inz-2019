import Application from "../../Application";
import { ICredentialsService } from "../../service/authentication/CredentialsService";
import { IStore } from "../../model/runtime/state/Store";
import { ITeamService } from "../../service/team/TeamService";

export default class LoadUserPreferencesInteractor {
  private application: Application;
  private credentialsService: ICredentialsService;
  private teamService: ITeamService;
  private store: IStore;

  constructor({ application, credentialsService, store, teamService }) {
    this.application = application;
    this.credentialsService = credentialsService;
    this.store = store;
    this.teamService = teamService;
  }

  async execute() {
    this.credentialsService.setIsLoggedIn(true);
    const userEmail = await this.credentialsService.getEmailFromStorage();
    const userId = await this.credentialsService.getUserIdFromStorage();
    const teamInvites =
      userId && (await this.teamService.getTeamInvitesForUser(userId));
    this.store.update({
      userEmail,
      countTeamInvites: teamInvites && teamInvites.length
    });
  }
}
