import Area, { IArea } from "./Area";
import Application from "../Application";
import { IRouter } from "../runtime/Router";
import { Layouts } from "../common/Constants";
import LoginPage from "../ui/pages/authentication/LoginPage";
import ShowLoginInteractor from "../interactor/authentication/ShowLoginInteractor";
import LogoutInteractor from "../interactor/authentication/LogoutInteractor";
import LogoutPage from "../ui/pages/authentication/LogoutPage";
import ShowRegistrationInteractor from "../interactor/authentication/ShowRegistrationInteractor";
import RegistrationPage from "../ui/pages/authentication/RegistrationPage";

export default class AuthenticationArea extends Area implements IArea {
  private application: Application;
  private router: IRouter;

  constructor({
    application,
    router
  }: {
    application: Application;
    router: IRouter;
  }) {
    super();
    this.application = application;
    this.router = router;
  }

  register(params: any) {
    this.router.registerRoutes(
      {
        path: "/login",
        page: this.createPage({
          Page: LoginPage,
          action: this.showLoginPage.bind(this)
        }),
        options: {
          secure: false,
          layout: Layouts.BASE
        }
      },
      {
        path: "/dologout",
        page: this.createPage({
          Page: LogoutPage,
          action: this.logout.bind(this)
        }),
        options: {
          secure: false,
          layout: Layouts.BASE
        }
      },
      {
        path: "/register",
        page: this.createPage({
          Page: RegistrationPage,
          action: this.showRegistration.bind(this)
        }),
        options: {
          secure: false,
          layout: Layouts.BASE
        }
      }
    );
  }

  public showLoginPage({ email }: { email?: string }) {
    return this.application.container
      .resolve<ShowLoginInteractor>("showLogin")
      .execute(email);
  }

  public logout() {
    return this.application.container
      .resolve<LogoutInteractor>("logout")
      .execute();
  }

  public showRegistration() {
    return this.application.container
      .resolve<ShowRegistrationInteractor>("showRegistration")
      .execute();
  }
}
