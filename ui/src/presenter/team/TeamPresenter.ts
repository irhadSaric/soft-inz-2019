import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
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
  onChangeTeamData(key: string, value: any): void;
  onChangeTeamDescriptionValue(value: string): void;
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

    const validateEditTeamForm = () => {
      const teamDetails = _store.getState<TTeamPresenter>().teamDetails;
      let editValidationErrors = _store.getState<TTeamPresenter>()
        .editValidationErrors;
      editValidationErrors = {
        name: [],
        description: []
      };
      if (!teamDetails.name) {
        editValidationErrors.name.push("The Name field is required.");
      }
      if (!teamDetails.description) {
        editValidationErrors.lastName.push(
          "The Description field is required."
        );
      }
      _store.update({
        editButtonDisabled:
          editValidationErrors.name.length ||
          editValidationErrors.description.length
            ? true
            : false,
        editValidationErrors
      });
    };

    const onChangeTeamData = (key: string, value: any) => {
      let teamDetails = _store.getState<TTeamPresenter>().teamDetails;
      //teamDetails[key] = value;
      _store.update({ teamDetails });
      const editValidationErrors = _store.getState<TTeamPresenter>()
        .editValidationErrors;
      editValidationErrors && validateEditTeamForm();
    };

    const onChangeTeamDescriptionValue = (value: string) => {
      _store.update({
        description: value
      });
      const editValidationErrors = _store.getState<TTeamPresenter>()
        .editValidationErrors;
      editValidationErrors && validateEditTeamForm();
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
      onChangeTeamData,
      onChangeTeamDescriptionValue
    };
  },
  defaultState
);

export default TeamPresenter;
