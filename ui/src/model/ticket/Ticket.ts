import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatus } from "../status/Status";
import { IUser } from "../user/User";
import { IIteration } from "../iteration/Iteration";
import { IProject } from "../project/Project";

export interface TTicket {
  assignee: IUser;
  description: string;
  endDate: Date;
  iteration: IIteration;
  name: string;
  project: IProject;
  startDate: Date;
  status: IStatus;
  ticketTypeId: number;
}

export interface ITicket extends TTicket {}

const Ticket = Model(
  (model: TTicket): ITicket => {
    const _ticket: TTicket = Object.assign({}, model);

    let create = (ticket: ITicket): ITicket => {
      let obj = ValidatableObject(ticket);
      return obj;
    };
    let ticket = {
      get assignee() {
        return _ticket.assignee;
      },
      set assignee(value) {
        _ticket.assignee = value;
      },
      get description() {
        return _ticket.description;
      },
      set description(value) {
        _ticket.description = value;
      },
      get endDate() {
        return _ticket.endDate;
      },
      set endDate(value) {
        _ticket.endDate = value;
      },
      get iteration() {
        return _ticket.iteration;
      },
      set iteration(value) {
        _ticket.iteration = value;
      },
      get name() {
        return _ticket.name;
      },
      set name(value) {
        _ticket.name = value;
      },
      get project() {
        return _ticket.project;
      },
      set project(value) {
        _ticket.project = value;
      },
      get startDate() {
        return _ticket.startDate;
      },
      set startDate(value) {
        _ticket.startDate = value;
      },

      get status() {
        return _ticket.status;
      },
      set status(value) {
        _ticket.status = value;
      },
      get ticketTypeId() {
        return _ticket.ticketTypeId;
      },
      set ticketTypeId(value) {
        _ticket.ticketTypeId = value;
      }
    };

    return create(ticket);
  }
);

export default Ticket;
