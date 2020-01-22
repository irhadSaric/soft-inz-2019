import Application from "../../Application";
import TicketPresenter, {
  ITicketPresenter
} from "../../presenter/ticket/TicketPresenter";
import { ITicketService } from "../../service/ticket/TicketService";
import { ITicket } from "../../model/ticket/Ticket";
import { ITicketDetails } from "../../model/ticket/TicketDetails";
import { IUserService } from "../../service/user/UserService";
import { IUser } from "../../model/user/User";

export default class ShowTicketInteractor {
  private application: Application;
  private output?: ITicketPresenter;
  private ticketService: ITicketService;
  private userService: IUserService;

  constructor({ application, ticketService, userService }: any) {
    this.application = application;
    this.ticketService = ticketService;
    this.userService = userService;
  }

  execute(ticketId: number) {
    this.output = TicketPresenter({
      application: this.application,
      initialState: {
        isEditableForm: false,
        editButtonDisabled: false,
        tickets: [],
        ticket: {} as ITicket,
        ticketDetails: {} as ITicketDetails,
        userList: [],
        selectedUsers: [],
        userProfile: {} as IUser
      }
    });

    this.ticketService
      .getAllTickets()
      .then(this.output && this.output.loadTickets);

    this.ticketService
      .getTicketDetails(ticketId)
      .then(this.output && this.output.loadTicketDetails);

    this.userService.getUsers().then(this.output && this.output.loadUserList);

    return this.output;
  }
}
