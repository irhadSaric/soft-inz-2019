import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatus } from "../status/Status";

export interface TTicketDetails {
  assigneeId: number;
  description: string;
  endDate: Date;
  iterationId: number;
  name: string;
  projectId: number;
  startDate: Date;
  status: IStatus;
  ticketTypeId: number;
}

export interface ITicketDetails extends TTicketDetails {}

const TicketDetails = Model(
  (model: TTicketDetails): ITicketDetails => {
    const _ticket: TTicketDetails = Object.assign({}, model);

    let create = (ticket: ITicketDetails): ITicketDetails => {
      let obj = ValidatableObject(ticket);
      return obj;
    };

    let ticket = {
      get assigneeId() {
        return _ticket.assigneeId;
      },
      set assigneeId(value) {
        _ticket.assigneeId = value;
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
      get iterationId() {
        return _ticket.iterationId;
      },
      set iterationId(value) {
        _ticket.iterationId = value;
      },
      get name() {
        return _ticket.name;
      },
      set name(value) {
        _ticket.name = value;
      },
      get projectId() {
        return _ticket.projectId;
      },
      set projectId(value) {
        _ticket.projectId = value;
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

export default TicketDetails;
