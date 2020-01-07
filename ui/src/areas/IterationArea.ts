import Application from "../Application";
import Area, { IArea } from "./Area";
import { IRouter } from "../runtime/Router";
import IterationPage from "../ui/pages/iteration/IterationPage";
import ShowIterationInteractor from "../interactor/iteration/ShowIterationInteractor";

export default class IterationArea extends Area implements IArea {
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
      path: "/iteration",
      page: this.createPage({
        Page: IterationPage,
        action: this.showIterationPage.bind(this)
      }),
      options: {}
    });
  }

  public showIterationPage() {
    return this.application.container
      .resolve<ShowIterationInteractor>("showIteration")
      .execute();
  }
}
