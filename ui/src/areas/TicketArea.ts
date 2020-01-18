import Application from "../Application";
import Area, { IArea } from "./Area";
import { IRouter } from "../runtime/Router";
import TicketPage from "../ui/pages/ticket/TicketPage";
import ShowTicketInteractor from "../interactor/ticket/ShowTicketInteractor";

export default class TicketArea extends Area implements IArea {
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
      path: "/ticket/:ticketId",
      page: this.createPage({
        Page: TicketPage,
        action: this.showTicketPage.bind(this)
      }),
      options: {}
    });
  }

  public showTicketPage(params: any) {
    return this.application.container
      .resolve<ShowTicketInteractor>("showTicket")
      .execute(params.ticketId);
  }
}
