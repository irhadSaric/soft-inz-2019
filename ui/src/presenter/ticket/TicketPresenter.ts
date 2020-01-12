import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ITicket } from "../../model/ticket/Ticket";

export interface TTicketPresenter extends TLoadingAwarePresenter {
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  ticket: ITicket;
  loadTickets: any;
}
export interface ITicketPresenter extends TTicketPresenter, TPresentable {
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  loadTickets(ticket: ITicket): void;
}

const defaultState: TTicketPresenter = {
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,
  ticket: {} as ITicket,
  loadTickets: {} as ITicket
};

const TicketPresenter = withStore<ITicketPresenter, TTicketPresenter>(
  ({ application, store, loader, translate }): ITicketPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TTicketPresenter>();

    const onEditBtnClick = () => {
      _store.update({ isEditableForm: true });
    };

    const onCancelBtnClick = () => {
      _store.update({ isEditableForm: false });
    };

    const loadTickets = (ticket: ITicket) => {
      return _store.update({
        ticket
      });
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      onEditBtnClick,
      onCancelBtnClick,
      loadTickets
    };
  },
  defaultState
);

export default TicketPresenter;
