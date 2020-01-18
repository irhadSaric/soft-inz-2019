import { IHttpService } from "../HttpService";
import Ticket, { ITicket } from "../../model/ticket/Ticket";
import User from "../../model/user/User";
import Iteration from "../../model/iteration/Iteration";
import Project from "../../model/project/Project";
import Status from "../../model/status/Status";
import TicketDetails, {
  ITicketDetails
} from "../../model/ticket/TicketDetails";

export interface ITicketService {
  getAllTickets(): Promise<ITicket[]>;
  getTicketDetails(ticketId: number): Promise<ITicketDetails>;
  createTicket(
    description: string,
    endDate: Date,
    name: string,
    projectId: number
  ): Promise<any>;
}

const TicketService = ({ httpService }): ITicketService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/ticket";
  const _details: string = "/details";
  const _create: string = "/create";

  const buildTicketList = (data: any): ITicket[] => {
    return data.map(item => {
      let ticket = Ticket(item);
      ticket.assignee = User(item.assignee);
      ticket.iteration = Iteration(item.iteration);
      ticket.project = Project(item.project);
      ticket.status = Status(item.status);
      ticket.endDate = new Date(item.endDate);
      ticket.startDate = new Date(item.startDate);
      return ticket;
    });
  };

  // const buildTicketDetails = (data: any): ITicketDetails => {
  //   return data.map(item => {
  //     let ticketDetails = TicketDetails(item);
  //     ticketDetails.endDate = new Date(item.endDate);
  //     ticketDetails.startDate = new Date(item.startDate);
  //     ticketDetails.status = Status(item.status);      
  //     return ticketDetails;
  //   });
  // };

  return {
    async getAllTickets() {
      const path = _http.buildPath(_basePath);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return buildTicketList(responseJSON);
    },
    async getTicketDetails(ticketId: number) {
      const path = _http.buildPath(_basePath, _details, ticketId.toString());
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return TicketDetails(responseJSON);
    },
    async createTicket(
      description: string,
      endDate: Date,
      name: string,
      projectId: number
    ) {
      const path = _http.buildPath(_basePath, _create);
      const response = await _http.post(path, {
        params: {
          description,
          endDate,
          name,
          projectId
        }
      });
      return _http.toJSON(response);
    }
  };
};

export default TicketService;
