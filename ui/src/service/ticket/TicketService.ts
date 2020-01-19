import { IHttpService } from "../HttpService";
import Ticket, { ITicket } from "../../model/ticket/Ticket";
import User from "../../model/user/User";
import Iteration from "../../model/iteration/Iteration";
import Project from "../../model/project/Project";
import Status, { IStatus } from "../../model/status/Status";
import TicketDetails, {
  ITicketDetails
} from "../../model/ticket/TicketDetails";
import StatusType from "../../model/status/StatusType";

export interface ITicketService {
  getAllTickets(): Promise<ITicket[]>;
  getTicketDetails(ticketId: number): Promise<ITicketDetails>;
  createTicket(
    description: string,
    endDate: Date,
    name: string,
    projectId: number
  ): Promise<any>;
  changeStatusOfTicket(statusId: number, ticketId: number): Promise<IStatus>;
}

const TicketService = ({ httpService }): ITicketService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/ticket";
  const _details: string = "/details";
  const _create: string = "/create";
  const _updateStatus: string = "/update-status";

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

  const buildStatus = (data: any): IStatus => {
    let status = Status(data);
    status.statusType = StatusType(data.statusType);
    return status;
  };

  const buildTicketDetails = (data: any): ITicketDetails => {
    let ticketDetails = TicketDetails(data);
    ticketDetails.endDate = new Date(data.endDate);
    ticketDetails.startDate = new Date(data.startDate);
    ticketDetails.status = Status(data.status);
    return ticketDetails;
  };

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
      return buildTicketDetails(responseJSON);
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
    },
    async changeStatusOfTicket(statusId: number, ticketId: number) {
      const path = _http.buildPath(
        _basePath,
        ticketId.toString(),
        _updateStatus,
        statusId.toString()
      );
      const response = await _http.put(path);
      const responseJSON = await _http.toJSON(response);
      return buildStatus(responseJSON);
    }
  };
};

export default TicketService;
