import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ITicket } from "../../model/ticket/Ticket";
import { ITicketDetails } from "../../model/ticket/TicketDetails";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import CreateTicketInteractor from "../../interactor/ticket/CreateTicketInteractor";
import {
  TSelectValuePresentationModel,
  THomePresenter
} from "../main/HomePresenter";
import { IUser } from "../../model/user/User";
import GetAllUsersInteractor from "../../interactor/user/GetAllUsersInteractor";

export interface TTicketPresenter extends TLoadingAwarePresenter {
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  tickets: ITicket[];
  ticket: ITicket;
  ticketDetails: ITicketDetails;
  userList: IUser[];
  selectedUsers: TSelectValuePresentationModel[];
  userProfile: IUser;
  ticketId?: number;
}
export interface ITicketPresenter extends TTicketPresenter, TPresentable {
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  loadTickets(tickets: ITicket[]): void;
  loadTicketDetails(ticketDetails: ITicketDetails): void;
  onChangeTicketData(key: string, value: any): void;
  loadUserList(userList: IUser[]): void;
  loadUserProfile(userProfile: IUser): void;
  updateTicketDetails(): void;
  onChangeSelectUserList(value: TSelectValuePresentationModel[]): void;
  onChangeSelectSearch(value: string): void;
  onDropdownVisibleChange(value: boolean): void;
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
  selectedUsers: [],
  userProfile: {} as IUser
};

const TicketPresenter = withStore<ITicketPresenter, TTicketPresenter>(
  ({ application, store, loader, translate }): ITicketPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TTicketPresenter>();

    loader.start("userListLoader");

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

    const updateTicketDetails = async () => {
      try {
        loader.start("editTicketLoader");
        const ticketDetails = _store.getState<TTicketPresenter>().ticketDetails;
        const selectedUsers = _store.getState<THomePresenter>().selectedUsers;
        // const userProfile = _store.getState<THomePresenter>().userProfile;
        const response = await _application.container
          .resolve<CreateTicketInteractor>("updateTicketDetails")
          .execute(
            ticketDetails.description,
            ticketDetails.endDate,
            ticketDetails.name,
            ticketDetails.projectId
          );
        loader.stop("editProjectLoader");
        _application.container
          .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
          .execute("Changes successfully saved");
        selectedUsers.forEach(element => {
          assignUserToTask(response.ticketId);
        });
        _store.update({
          ticketDetails,
          isEditableForm: false
        });
      } catch (error) {
        loader.stop("editTeamLoader");
        _application.container
          .resolve<ShowErrorMessageInteractor>("showErrorMessage")
          .execute(error.message);
      }
    };

    const onChangeSelectUserList = (value: TSelectValuePresentationModel[]) => {
      _store.update({ selectedUsers: value });
    };

    const onChangeSelectSearch = async (value: string) => {
      loader.start("userListLoader");
      _store.update({
        userList: []
      });
      let userList;

      userList = await application.container
        .resolve<GetAllUsersInteractor>("getAllUsers")
        .execute();

      _store.update({
        userList
      });
      loader.stop("userListLoader");
    };

    const onDropdownVisibleChange = async (value: boolean) => {
      if (!value) {
        loader.start("userListLoader");
        _store.update({
          userList: []
        });
        const userList = await application.container
          .resolve<GetAllUsersInteractor>("getAllUsers")
          .execute();
        _store.update({ userList });
        loader.stop("userListLoader");
      }
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
      loadUserList,
      loadUserProfile,
      updateTicketDetails,
      onChangeSelectUserList,
      onChangeSelectSearch,
      onDropdownVisibleChange,
      assignUserToTask
    };
  },
  defaultState
);

export default TicketPresenter;
