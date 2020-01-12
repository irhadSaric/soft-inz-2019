import { IHttpService } from "../HttpService";
import Ticket, { ITicket } from "../../model/ticket/Ticket";

export interface ITicketService {
  getAllTickets(): Promise<ITicket>;
}

const TicketService = ({ httpService }): ITicketService => {
  const _http: IHttpService = httpService;
  const _basePath: string = "/api/ticket";

  return {
    async getAllTickets() {
      const path = _http.buildPath(_basePath);
      const response = await _http.get(path);
      const responseJSON = await _http.toJSON(response);
      return Ticket(responseJSON);
    }
  };
};

export default TicketService;
