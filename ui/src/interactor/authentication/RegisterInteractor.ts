import Application from "../../Application";
import { IAuthenticationService } from "../../service/authentication/AuthenticationService";
import { IRouter } from "../../runtime/Router";
import { ICredentialsService } from "../../service/authentication/CredentialsService";
import { ICountry } from "../../model/country/Country";

export default class RegisterInteractor {
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

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    country: ICountry
  ) {
    try {
      await this.authenticationService.register(
        firstName,
        lastName,
        email,
        password,
        phone,
        country
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
