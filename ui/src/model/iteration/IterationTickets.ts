import Model from "../Model";
import ValidatableObject from "../validation/ValidatableObject";
import { IStatus } from "../status/Status";

export interface TIterationTickets {
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

export interface IIterationTickets extends TIterationTickets {}

const IterationTickets = Model(
  (model: TIterationTickets): IIterationTickets => {
    const _iterationTickets: TIterationTickets = Object.assign({}, model);

    let create = (iterationTickets: IIterationTickets): IIterationTickets => {
      let obj = ValidatableObject(iterationTickets);
      return obj;
    };

    let iterationTickets = {
      get assigneeId() {
        return _iterationTickets.assigneeId;
      },
      set assigneeId(value) {
        _iterationTickets.assigneeId = value;
      },
      get iterationId() {
        return _iterationTickets.iterationId;
      },
      set iterationId(value) {
        _iterationTickets.iterationId = value;
      },
      get ticketTypeId() {
        return _iterationTickets.ticketTypeId;
      },
      set ticketTypeId(value) {
        _iterationTickets.ticketTypeId = value;
      },
      get projectId() {
        return _iterationTickets.projectId;
      },
      set projectId(value) {
        _iterationTickets.projectId = value;
      },
      get name() {
        return _iterationTickets.name;
      },
      set name(value) {
        _iterationTickets.name = value;
      },
      get description() {
        return _iterationTickets.description;
      },
      set description(value) {
        _iterationTickets.description = value;
      },
      get startDate() {
        return _iterationTickets.startDate;
      },
      set startDate(value) {
        _iterationTickets.startDate = value;
      },
      get endDate() {
        return _iterationTickets.endDate;
      },
      set endDate(value) {
        _iterationTickets.endDate = value;
      },
      get status() {
        return _iterationTickets.status;
      },
      set status(value) {
        _iterationTickets.status = value;
      }
    };

    return create(iterationTickets);
  }
);

export default IterationTickets;
