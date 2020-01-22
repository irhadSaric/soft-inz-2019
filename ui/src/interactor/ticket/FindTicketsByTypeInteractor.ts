import Application from "../../Application";
import { ITicketService } from "../../service/ticket/TicketService";

export default class GetAllUsersInteractor {
  private application: Application;
  private ticketService: ITicketService;

  constructor({ application, ticketService }: any) {
    this.application = application;
    this.ticketService = ticketService;
  }

  async execute(iterationId: number, ticketTypeId: number) {
    return this.ticketService.findTicketsByType(iterationId, ticketTypeId);
  }
}
