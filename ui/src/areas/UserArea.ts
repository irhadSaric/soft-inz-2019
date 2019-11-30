import Application from "../Application";
import Area, { IArea } from "./Area";
import { IRouter } from "../runtime/Router";
import ShowUserInteractor from "../interactor/user/ShowUserInteractor";
import UsersPage from "../ui/pages/users/UsersPage";

export default class UserArea extends Area implements IArea {
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
    this.router.registerRoutes({
      path: "/users",
      page: this.createPage({
        Page: UsersPage,
        action: this.showUsersPage.bind(this)
      }),
      options: {}
    });
  }

  public showUsersPage() {
    return this.application.container
      .resolve<ShowUserInteractor>("showUser")
      .execute();
  }
}
