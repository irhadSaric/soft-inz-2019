import { IHttpService } from "../HttpService";
import Ticket, { ITicket } from "../../model/ticket/Ticket";
import User from "../../model/user/User";
import Iteration from "../../model/iteration/Iteration";
import Project from "../../model/project/Project";
import Status from "../../model/status/Status";

export interface ITicketService {
  getAllTickets(): Promise<ITicket[]>;
}

const TicketService = ({ httpService }): ITicketService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/ticket";

  const buildTicketList = (data: any): ITicket[] => {
    return data.map(item => {
      let ticket = Ticket(item);
      ticket.assignee = User(item.assignee);
      ticket.iteration = Iteration(item.iteration);
      ticket.project = Project(item.project);
      ticket.status = Status(item.status);
      return ticket;
    });
  };

  return {
    async getAllTickets() {
      const path = _http.buildPath(_basePath);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildTicketList(responseJSON);
    }
  };
};

export default TicketService;
