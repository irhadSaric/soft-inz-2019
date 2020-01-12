import Application from "../Application";
import Area, { IArea } from "./Area";
import { IRouter } from "../runtime/Router";
import ShowProjectInteractor from "../interactor/project/ShowProjectInteractor";
import ProjectPage from "../ui/pages/project/ProjectPage";

export default class ProjectArea extends Area implements IArea {
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
      path: "/project/:projectId",
      page: this.createPage({
        Page: ProjectPage,
        action: this.showProjectPage.bind(this)
      }),
      options: {}
    });
  }

  public showProjectPage(params: any) {
    return this.application.container
      .resolve<ShowProjectInteractor>("showProject")
      .execute(params.projectId);
  }
}
