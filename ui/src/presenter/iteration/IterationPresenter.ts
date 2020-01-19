import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { IIteration } from "../../model/iteration/Iteration";
import { IIterationTicket } from "../../model/iteration/IterationTicket";
import { IStatus } from "../../model/status/Status";
import { IProject } from "../../model/project/Project";
import { DateService } from "../../service/DateService";
import { ITicket } from "../../model/ticket/Ticket";
import CreateTicketInteractor from "../../interactor/ticket/CreateTicketInteractor";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import { TTicketPresenter } from "../ticket/TicketPresenter";

export interface TIterationPresenter extends TLoadingAwarePresenter {
  iteration: TIterationPresentationModel;
  iterationTickets: IIterationTicket[];
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  isCreateTicketModalVisible: boolean;
  ticket: ITicket;
  iterationId?: number;
  createTicketValidationErrors?: any;
}
export interface IIterationPresenter extends TIterationPresenter, TPresentable {
  loadIterations(iteration: IIteration): void;
  loadIterationTickets(iterationTickets: IIterationTicket[]): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  showTicketPage(ticketId: number): void;
  createTicket(): void;
  onChangeTicketData(key: string, value: any): void;
  onCreateTicketBtnClick(): void;
  onCancelTicketModalButtonClick(): void;
}

export interface TIterationPresentationModel {
  description: string;
  endDate: string;
  id: number;
  name: string;
  startDate: string;
  status: IStatus;
  project: IProject;
}

const defaultState: TIterationPresenter = {
  iteration: {} as TIterationPresentationModel,
  iterationTickets: [],
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,
  isCreateTicketModalVisible: false,
  ticket: {} as ITicket
};

const IterationPresentationModel = (data: IIteration) => {
  return {
    description: data.description,
    endDate: data.endDate ? DateService().formatDate(data.endDate) : undefined,
    id: data.id,
    name: data.name,
    startDate: data.startDate
      ? DateService().formatDate(data.startDate)
      : undefined,
    status: data.status,
    project: data.project
  };
};

const IterationPresenter = withStore<IIterationPresenter, TIterationPresenter>(
  ({ application, store, loader, translate }): IIterationPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TIterationPresenter>();

    const loadIterations = (iteration: IIteration) => {
      return _store.update({
        iteration: IterationPresentationModel(iteration)
      });
    };

    const loadIterationTickets = (iterationTickets: IIterationTicket[]) => {
      return _store.update({
        iterationTickets
      });
    };

    const onEditBtnClick = () => {
      _store.update({ isEditableForm: true });
    };

    const onCancelBtnClick = () => {
      _store.update({ isEditableForm: false });
    };

    const showTicketPage = (ticketId: number) => {
      application.navigator.replace({ pathname: `/ticket/${ticketId}` });
    };

    const onCreateIterationBtnClick = () => {
      _store.update({
        isCreateIterationModalVisible: true
      });
    };

    const onChangeIterationData = (key: string, value: any) => {
      let iteration = _store.getState<TIterationPresenter>().iteration;
      iteration[key] = value;
      _store.update({ iteration });
    };

    const onCancelIterationModalButtonClick = () => {
      _store.update({
        isCreateIterationModalVisible: false,
        iterationName: "",
        iterationDescription: ""
      });
    };

    const validateCreateTicketForm = () => {
      const ticket = _store.getState<TIterationPresenter>().ticket;
      let createTicketValidationErrors = _store.getState<TIterationPresenter>()
        .createTicketValidationErrors;
      createTicketValidationErrors = {
        ticketName: [],
        ticketDescription: [],
        ticketEndDate: []
      };
      if (!ticket.name) {
        createTicketValidationErrors.ticketName.push(
          "The Ticket Name field is required."
        );
      }
      if (!ticket.description) {
        createTicketValidationErrors.ticketDescription.push(
          "The Description field is required."
        );
      }
      if (
        typeof ticket.endDate === "undefined" ||
        Object.entries(ticket.endDate).length === 0
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
      const createTicketValidationErrors = _store.getState<
        TIterationPresenter
      >().createTicketValidationErrors;
      if (
        !(
          createTicketValidationErrors.ticketName.length ||
          createTicketValidationErrors.ticketDescription.length ||
          createTicketValidationErrors.ticketEndDate.length
        )
      )
        try {
          loader.start("createTicketLoader");
          const ticket = _store.getState<TIterationPresenter>().ticket;
          const iteration = _store.getState<TIterationPresenter>().iteration;
          iteration.id &&
            (await _application.container
              .resolve<CreateTicketInteractor>("createTicket")
              .execute(
                ticket.description,
                ticket.endDate,
                ticket.name,
                iteration.id
              ));
          loader.stop("createTicketLoader");
          _application.container
            .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
            .execute("You have successfully created ticket");
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

    const onChangeTicketData = (key: string, value: any) => {
      let ticketDetails = _store.getState<TTicketPresenter>().ticketDetails;
      ticketDetails[key] = value;
      _store.update({ ticketDetails });
    };

    const onCancelTicketModalButtonClick = () => {
      _store.update({
        isCreateTicketModalVisible: false,
        ticketName: "",
        ticketDescription: ""
      });
    };

    const onCreateTicketBtnClick = () => {
      _store.update({
        isCreateTicketModalVisible: true
      });
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      loadIterations,
      loadIterationTickets,
      onEditBtnClick,
      onCancelBtnClick,
      showTicketPage,
      createTicket,
      onChangeTicketData,
      onCancelTicketModalButtonClick,
      onCreateTicketBtnClick
    };
  },
  defaultState
);

export default IterationPresenter;
