import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ITeamDetails } from "../../model/team/TeamDetails";
import UpdateTeamDetailsInteractor from "../../interactor/team/UpdateTeamDetailsInteractor";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import { ITeamProject } from "../../model/team/TeamProject";
import { IActiveTeam } from "../../model/team/ActiveTeam";
import { IActiveTeamMember } from "../../model/team/ActiveTeamMember";
import { IUser } from "../../model/user/User";
import { ITeamInvite } from "../../model/team/TeamInvite";
import { TSelectValuePresentationModel } from "../main/HomePresenter";

export interface TTeamPresenter extends TLoadingAwarePresenter {
  teamDetails: ITeamDetails;
  teamProjects: ITeamProject[];
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  activeTeamMembers: IActiveTeamMember[];
  userList: IUser[];
  selectedUsers: TSelectValuePresentationModel[];
}
export interface ITeamPresenter extends TTeamPresenter, TPresentable {
  loadTeamDetails(teamDetails: ITeamDetails): void;
  loadTeamProjects(teamProjects: ITeamProject[]): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  onChangeTeamData(key: string, value: any): void;
  updateTeamDetails(): void;
  loadActiveTeamMembersList(activeTeamMembers: IActiveTeamMember[]): void;
  loadUserList(userList: IUser[]): void;
  loadTeamInvitesForUser(teamInvitesForUser: ITeamInvite[]): void;
  loadUserProfile(userProfile: IUser): void;
  onChangeSelectUserList(value: TSelectValuePresentationModel[]): void;
}

const defaultState: TTeamPresenter = {
  teamDetails: {} as ITeamDetails,
  teamProjects: [],
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,
  activeTeamMembers: [],
  userList: [],
  selectedUsers: []
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

    const loadTeamProjects = (teamProjects: ITeamProject[]) => {
      return _store.update({
        teamProjects
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
      teamDetails[key] = value;
      _store.update({ teamDetails });
      const editValidationErrors = _store.getState<TTeamPresenter>()
        .editValidationErrors;
      editValidationErrors && validateEditTeamForm();
    };

    const updateTeamDetails = async () => {
      validateEditTeamForm();
      const editValidationErrors = _store.getState<TTeamPresenter>()
        .editValidationErrors;
      if (
        !(
          editValidationErrors.name.length ||
          editValidationErrors.description.length
        )
      ) {
        try {
          loader.start("editTeamLoader");
          const teamDetails = _store.getState<TTeamPresenter>().teamDetails;
          _application.container
            .resolve<UpdateTeamDetailsInteractor>("updateTeamDetails")
            .execute(teamDetails);
          loader.stop("editTeamLoader");
          _application.container
            .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
            .execute("Changes successfully saved");
          _store.update({
            teamDetails,
            isEditableForm: false
          });
        } catch (error) {
          loader.stop("editTeamLoader");
          _application.container
            .resolve<ShowErrorMessageInteractor>("showErrorMessage")
            .execute(error.message);
        }
      } else {
        _store.update({
          editButtonDisabled: true
        });
      }
    };
    const loadActiveTeamMembersList = (
      activeTeamMembers: IActiveTeamMember[]
    ) => {
      return _store.update({
        activeTeamMembers
      });
    };

    const loadUserList = (userList: IUser[]) => {
      _store.update({
        userList
      });
    };

    const loadTeamInvitesForUser = (teamInvitesForUser: ITeamInvite[]) => {
      return _store.update({
        teamInvitesForUser
      });
    };

    const loadUserProfile = (userProfile: IUser) => {
      return _store.update({
        userProfile
      });
    };

    const onChangeSelectUserList = (value: TSelectValuePresentationModel[]) => {
      _store.update({ selectedUsers: value });
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      loadTeamDetails,
      loadTeamProjects,
      translate,
      onEditBtnClick,
      onCancelBtnClick,
      onChangeTeamData,
      updateTeamDetails,
      loadActiveTeamMembersList,
      loadUserList,
      loadTeamInvitesForUser,
      loadUserProfile,
      onChangeSelectUserList
    };
  },
  defaultState
);

export default TeamPresenter;
