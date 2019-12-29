import Application from "../Application";
import Area, { IArea } from "./Area";
import { IRouter } from "../runtime/Router";
import ShowTeamInteractor from "../interactor/team/ShowTeamInteractor";
import TeamPage from "../ui/pages/team/TeamPage";

export default class TeamArea extends Area implements IArea {
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
      path: "/team/:teamId/details",
      page: this.createPage({
        Page: TeamPage,
        action: this.showTeamPage.bind(this)
      }),
      options: {}
    });
  }

  public showTeamPage(params: any) {
    return this.application.container
      .resolve<ShowTeamInteractor>("showTeam")
      .execute(params.teamId);
  }
}
