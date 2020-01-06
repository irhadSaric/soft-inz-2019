import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ITeamDetails } from "../../model/team/TeamDetails";
import UpdateTeamDetailsInteractor from "../../interactor/team/UpdateTeamDetailsInteractor";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import { ITeamProject } from "../../model/team/TeamProject";
import { IActiveTeam } from "../../model/team/ActiveTeam";
import { IActiveTeamMember } from "../../model/team/ActiveTeamMember";

export interface TIterationPresenter extends TLoadingAwarePresenter {
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
}
export interface IIterationPresenter extends TIterationPresenter, TPresentable {
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
}

const defaultState: TIterationPresenter = {
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false
};

const IterationPresenter = withStore<IIterationPresenter, TIterationPresenter>(
  ({ application, store, loader, translate }): IIterationPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TIterationPresenter>();

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
      onEditBtnClick,
      onCancelBtnClick
    };
  },
  defaultState
);

export default IterationPresenter;
