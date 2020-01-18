import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { IIteration } from "../../model/iteration/Iteration";
import { IIterationTicket } from "../../model/iteration/IterationTicket";
import { IStatus } from "../../model/status/Status";
import { IProject } from "../../model/project/Project";
import { DateService } from "../../service/DateService";

export interface TIterationPresenter extends TLoadingAwarePresenter {
  iteration: TIterationPresentationModel;
  iterationTickets: IIterationTicket[];
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
}
export interface IIterationPresenter extends TIterationPresenter, TPresentable {
  loadIterations(iteration: IIteration): void;
  loadIterationTickets(iterationTickets: IIterationTicket[]): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
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
  editButtonDisabled: false
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

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      loadIterations,
      loadIterationTickets,
      onEditBtnClick,
      onCancelBtnClick
    };
  },
  defaultState
);

export default IterationPresenter;
