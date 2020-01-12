import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { IIteration } from "../../model/iteration/Iteration";
import { IIterationTicket } from "../../model/iteration/IterationTicket";

export interface TIterationPresenter extends TLoadingAwarePresenter {
  iteration: IIteration;
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

const defaultState: TIterationPresenter = {
  iteration: {} as IIteration,
  iterationTickets: [],
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false
};

const IterationPresenter = withStore<IIterationPresenter, TIterationPresenter>(
  ({ application, store, loader, translate }): IIterationPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TIterationPresenter>();

    const loadIterations = (iteration: IIteration) => {
      return _store.update({
        iteration
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
