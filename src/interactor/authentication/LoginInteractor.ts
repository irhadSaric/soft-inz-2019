import Application from "../../Application";
import { IAuthenticationService } from "../../service/authentication/AuthenticationService";
import { IRouter } from "../../runtime/Router";
import { ICredentialsService } from "../../service/authentication/CredentialsService";

export default class LoginInteractor {
  private application: Application;
  private authenticationService: IAuthenticationService;
  private router: IRouter;
  private credentialsService: ICredentialsService;

  constructor({
    application,
    authenticationService,
    router,
    credentialsService
  }) {
    this.application = application;
    this.authenticationService = authenticationService;
    this.router = router;
    this.credentialsService = credentialsService;
  }

  async execute(email: string, password: string) {
    try {
      const {
        userId,
        roles,
        permissions
      } = await this.authenticationService.login(email, password);

      await this.credentialsService.setRoles(roles);
      await this.credentialsService.setPermissions(permissions);
      await this.credentialsService.setUserId(userId);

      this.credentialsService.saveEmailToStorage(email);
      this.credentialsService.setIsLoggedIn(true);
      this.router.replace({ pathname: "/home" });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
