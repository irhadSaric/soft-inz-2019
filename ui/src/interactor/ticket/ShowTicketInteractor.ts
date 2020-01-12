import Application from "../../Application";
import TicketPresenter, {
  ITicketPresenter
} from "../../presenter/ticket/TicketPresenter";
import { ITicketService } from "../../service/ticket/TicketService";
import { ITicket } from "../../model/ticket/Ticket";

export default class ShowTicketInteractor {
  private application: Application;
  private output?: ITicketPresenter;
  private ticketService: ITicketService;

  constructor({ application, ticketService }: any) {
    this.application = application;
    this.ticketService = ticketService;
  }

  execute() {
    this.output = TicketPresenter({
      application: this.application,
      initialState: {
        isEditableForm: false,
        editButtonDisabled: false,
        ticket: {} as ITicket,
        loadTickets: {} as ITicket
      }
    });

    this.ticketService
      .getAllTickets()
      .then(this.output && this.output.loadTickets);

    return this.output;
  }
}
