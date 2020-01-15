import Application from "../../Application";
import TicketPresenter, {
  ITicketPresenter
} from "../../presenter/ticket/TicketPresenter";
import { ITicketService } from "../../service/ticket/TicketService";
import { ITicket } from "../../model/ticket/Ticket";
import { ITicketDetails } from "../../model/ticket/TicketDetails";

export default class ShowTicketInteractor {
  private application: Application;
  private output?: ITicketPresenter;
  private ticketService: ITicketService;

  constructor({ application, ticketService }: any) {
    this.application = application;
    this.ticketService = ticketService;
  }

  execute(ticketId: number) {
    this.output = TicketPresenter({
      application: this.application,
      initialState: {
        isEditableForm: false,
        editButtonDisabled: false,
        tickets: [],
        ticket: {} as ITicket,
        ticketDetails: {} as ITicketDetails
      }
    });

    this.ticketService
      .getAllTickets()
      .then(this.output && this.output.loadTickets);

    this.ticketService
      .getTicketDetails(ticketId)
      .then(this.output && this.output.loadTicketDetails);

    return this.output;
  }
}
