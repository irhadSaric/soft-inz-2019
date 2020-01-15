import { ITicketService } from "../../service/ticket/TicketService";

export default class CreateTicketInteractor {
  private ticketService: ITicketService;

  constructor({ ticketService }) {
    this.ticketService = ticketService;
  }

  async execute(
    description: string,
    endDate: Date,
    name: string,
    projectId: number
  ) {
    try {
      return this.ticketService.createTicket(
        description,
        endDate,
        name,
        projectId
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
