import Application from "../Application";
import Area, { IArea } from "./Area";
import { IRouter } from "../runtime/Router";
import HomePage from "../ui/pages/main/HomePage";
import EmptyPage from "../ui/pages/EmptyPage";
import ShowHomeInteractor from "../interactor/main/ShowHomeInteractor";
import { Layouts } from "../common/Constants";

export default class HomeArea extends Area implements IArea {
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
        path: "/home",
        page: this.createPage({
          Page: HomePage,
          action: this.showHomePage.bind(this)
        }),
        options: {
          secure: true
        }
      },
      {
        path: "/",
        page: this.createPage({
          Page: HomePage,
          action: this.showHomePage.bind(this)
        }),
        options: {
          secure: true
        }
      },
      {
        path: "/error",
        page: this.createPage({
          Page: EmptyPage,
          action: () => {}
        }),
        options: {
          secure: false,
          initialProps: {
            title: "Error",
            text: "page not found."
          },
          layout: Layouts.BASE
        }
      }
    );
  }

  public showHomePage() {
    return this.application.container
      .resolve<ShowHomeInteractor>("showHome")
      .execute();
  }
}
