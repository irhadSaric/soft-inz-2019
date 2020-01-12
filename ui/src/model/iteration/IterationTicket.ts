import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatus } from "../status/Status";

export interface TIterationTicket {
  assigneeId: number;
  iterationId: number;
  name: string;
  description: string;
  projectId: number;
  startDate: Date;
  endDate: Date;
  ticketTypeId: number;
  status: IStatus;
}

export interface IIterationTicket extends TIterationTicket {}

const IterationTicket = Model(
  (model: TIterationTicket): IIterationTicket => {
    const _iterationTicket: TIterationTicket = Object.assign({}, model);

    let create = (iterationTicket: IIterationTicket): IIterationTicket => {
      let obj = ValidatableObject(iterationTicket);
      return obj;
    };

    let iterationTickets = {
      get assigneeId() {
        return _iterationTicket.assigneeId;
      },
      set assigneeId(value) {
        _iterationTicket.assigneeId = value;
      },
      get iterationId() {
        return _iterationTicket.iterationId;
      },
      set iterationId(value) {
        _iterationTicket.iterationId = value;
      },
      get ticketTypeId() {
        return _iterationTicket.ticketTypeId;
      },
      set ticketTypeId(value) {
        _iterationTicket.ticketTypeId = value;
      },
      get projectId() {
        return _iterationTicket.projectId;
      },
      set projectId(value) {
        _iterationTicket.projectId = value;
      },
      get name() {
        return _iterationTicket.name;
      },
      set name(value) {
        _iterationTicket.name = value;
      },
      get description() {
        return _iterationTicket.description;
      },
      set description(value) {
        _iterationTicket.description = value;
      },
      get startDate() {
        return _iterationTicket.startDate;
      },
      set startDate(value) {
        _iterationTicket.startDate = value;
      },
      get endDate() {
        return _iterationTicket.endDate;
      },
      set endDate(value) {
        _iterationTicket.endDate = value;
      },
      get status() {
        return _iterationTicket.status;
      },
      set status(value) {
        _iterationTicket.status = value;
      }
    };

    return create(iterationTickets);
  }
);

export default IterationTicket;
