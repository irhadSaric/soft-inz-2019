import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ICountry } from "../../model/country/Country";
import { ITeamDetails } from "../../model/team/TeamDetails";

export interface TTeamPresenter extends TLoadingAwarePresenter {
  teamDetails: ITeamDetails;
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  projectDescription: string;
}
export interface ITeamPresenter extends TTeamPresenter, TPresentable {
  loadTeamDetails(teamDetails: ITeamDetails): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  onChangeProjectDescription(value: string): void;
}

const defaultState: TTeamPresenter = {
  teamDetails: {} as ITeamDetails,
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,
  projectDescription: "test"
};

const TeamPresenter = withStore<ITeamPresenter, TTeamPresenter>(
  ({ application, store, loader, translate }): ITeamPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TTeamPresenter>();

    const loadTeamDetails = (teamDetails: ITeamDetails) => {
      return _store.update({
        teamDetails
      });
    };

    const onEditBtnClick = () => {
      _store.update({ isEditableForm: true });
    };

    const onCancelBtnClick = () => {
      _store.update({ isEditableForm: false });
    };

    const onChangeProjectDescription = () => {
      _store.update({ isEditableForm: false });
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      loadTeamDetails,
      translate,
      onEditBtnClick,
      onCancelBtnClick,
      onChangeProjectDescription
    };
  },
  defaultState
);

export default TeamPresenter;
