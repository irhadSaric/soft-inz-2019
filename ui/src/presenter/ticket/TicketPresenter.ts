import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ITicket } from "../../model/ticket/Ticket";
import { ITicketDetails } from "../../model/ticket/TicketDetails";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import CreateTicketInteractor from "../../interactor/ticket/CreateTicketInteractor";
import { TSelectValuePresentationModel } from "../main/HomePresenter";
import { IUser } from "../../model/user/User";
//import CreateTicketInteractor from "../../interactor/ticket/CreateTicketInteractor";

export interface TTicketPresenter extends TLoadingAwarePresenter {
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  tickets: ITicket[];
  ticket: ITicket;
  ticketDetails: ITicketDetails;
  createTicketValidationErrors?: any;
  userList: IUser[];
  selectedUsers: TSelectValuePresentationModel[];
}
export interface ITicketPresenter extends TTicketPresenter, TPresentable {
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  loadTickets(tickets: ITicket[]): void;
  loadTicketDetails(ticketDetails: ITicketDetails): void;
  onChangeTicketData(key: string, value: any): void;
  createTicket(): void;
  loadUserList(userList: IUser[]): void;
  loadUserProfile(userProfile: IUser): void;
  assignUserToTask(value: TSelectValuePresentationModel[]): void;
}

const defaultState: TTicketPresenter = {
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,
  tickets: [],
  ticket: {} as ITicket,
  ticketDetails: {} as ITicketDetails,
  userList: [],
  selectedUsers: []
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

    const loadTickets = (tickets: ITicket[]) => {
      return _store.update({
        tickets
      });
    };

    const loadTicketDetails = (ticketDetails: ITicketDetails) => {
      return _store.update({
        ticketDetails
      });
    };

    const onChangeTicketData = (key: string, value: any) => {
      let ticketDetails = _store.getState<TTicketPresenter>().ticketDetails;
      ticketDetails[key] = value;
      _store.update({ ticketDetails });
    };

    const validateCreateTicketForm = () => {
      const ticketDetails = _store.getState<TTicketPresenter>().ticketDetails;
      let createTicketValidationErrors = _store.getState<TTicketPresenter>()
        .createTicketValidationErrors;
      createTicketValidationErrors = {
        ticketName: [],
        ticketDescription: [],
        ticketEndDate: []
      };
      if (!ticketDetails.name) {
        createTicketValidationErrors.ticketName.push(
          "The Ticket Name field is required."
        );
      }
      if (!ticketDetails.description) {
        createTicketValidationErrors.ticketDescription.push(
          "The Description field is required."
        );
      }
      if (
        typeof ticketDetails.endDate === "undefined" ||
        Object.entries(ticketDetails.endDate).length === 0
      ) {
        createTicketValidationErrors.ticketEndDate.push(
          "The End Date field is required."
        );
      }
      _store.update({
        createTicketValidationErrors
      });
    };

    const createTicket = async () => {
      validateCreateTicketForm();
      const createProjectValidationErrors = _store.getState<ITicketPresenter>()
        .createTicketValidationErrors;
      if (
        !(
          createProjectValidationErrors.ticketName.length ||
          createProjectValidationErrors.ticketDescription.length ||
          createProjectValidationErrors.ticketEndDate.length
        )
      )
        try {
          loader.start("createTicketLoader");
          const ticketDetails = _store.getState<TTicketPresenter>()
            .ticketDetails;
          ticketDetails.projectId &&
            (await _application.container
              .resolve<CreateTicketInteractor>("createTicket")
              .execute(
                ticketDetails.description,
                ticketDetails.endDate,
                ticketDetails.name,
                ticketDetails.projectId
              ));
          loader.stop("createTicketLoader");
          _application.container
            .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
            .execute("You have successfully created a ticket");
          _store.update({
            isCreateTicketModalVisible: false
          });
        } catch (error) {
          loader.stop("createTicketLoader");
          _application.container
            .resolve<ShowErrorMessageInteractor>("showErrorMessage")
            .execute(error.message);
        }
    };

    const loadUserList = (userList: IUser[]) => {
      _store.update({
        userList
      });
    };

    const loadUserProfile = (userProfile: IUser) => {
      return _store.update({
        userProfile
      });
    };

    const assignUserToTask = (value: TSelectValuePresentationModel[]) => {
      _store.update({ selectedUsers: value });
    };


    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      onEditBtnClick,
      onCancelBtnClick,
      loadTickets,
      loadTicketDetails,
      onChangeTicketData,
      createTicket,
      loadUserList,
      loadUserProfile,
      assignUserToTask
    };
  },
  defaultState
);

export default TicketPresenter;
