import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ITeamDetails } from "../../model/team/TeamDetails";
import { IStatus } from "../../model/status/Status";
import CreateProjectInteractor from "../../interactor/project/CreateProjectInteractor";
import UpdateTeamDetailsInteractor from "../../interactor/team/UpdateTeamDetailsInteractor";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import { IStatusType } from "../../model/status/StatusType";

export interface TTeamPresenter extends TLoadingAwarePresenter {
  teamDetails: ITeamDetails;
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  teamId?: number;
  isCreateProjectModalVisible: boolean;
  projectName: string;
  projectDescription: string;
  projectStatus: IStatus;
  projectEndDate: Date;
}
export interface ITeamPresenter extends TTeamPresenter, TPresentable {
  loadTeamDetails(teamDetails: ITeamDetails): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  onChangeTeamData(key: string, value: any): void;
  createProject(): void;
  onCreateProjectBtnClick(): void;
  onCancelProjectModalButtonClick(): void;
  onChangeProjectNameValue(value: string): void;
  onChangeProjectDescriptionValue(value: string): void;
  onChangeProjectStatusValue(value: IStatus): void;
  onChangeProjectEndDateValue(value: Date): void;
  updateTeamDetails(): void;
}

const defaultState: TTeamPresenter = {
  teamDetails: {} as ITeamDetails,
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,

  isCreateProjectModalVisible: false,
  projectName: "",
  projectDescription: "",
  projectStatus: {} as IStatus,
  projectEndDate: {} as Date
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

    const onCreateProjectBtnClick = () => {
      _store.update({
        isCreateProjectModalVisible: true
      });
    };

    const onChangeProjectDescriptionValue = (value: string) => {
      _store.update({
        projectDescription: value
      });
    };

    const onChangeProjectNameValue = (value: string) => {
      _store.update({
        projectName: value
      });
    };

    const onChangeProjectStatusValue = (value: IStatus) => {
      _store.update({
        projectStatus: value
      });
    };

    const onChangeProjectEndDateValue = (value: Date) => {
      _store.update({
        projectEndDate: value
      });
    };

    const onCancelProjectModalButtonClick = () => {
      _store.update({
        isCreateProjectModalVisible: false,
        projectName: "",
        projectDescription: ""
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

    const createProject = async () => {
      try {
        loader.start("createProjectLoader");
        const projectDescription = _store.getState<TTeamPresenter>()
          .projectDescription;
        const projectName = _store.getState<TTeamPresenter>().projectName;
        const teamId = _store.getState<TTeamPresenter>().teamId;
        const projectEndDate = _store.getState<TTeamPresenter>().projectEndDate;
        const projectStatus = _store.getState<TTeamPresenter>().projectStatus;
        const date1 = new Date("December 17, 2020 03:24:00");
        let status = {} as IStatus;
        status.id = 1;
        status.key = "active-team-member";
        status.name = "Active team member";
        let statusT = {} as IStatusType;
        statusT.id = 3;
        statusT.key = "user-team-related";
        statusT.name = "User-Team-related";
        status.statusType = statusT;
        console.log(projectDescription, projectName, date1, status);
        let a = application.navigator.showCurrentRoute();
        console.log(teamId);
        const response =
          teamId &&
          (await _application.container
            .resolve<CreateProjectInteractor>("createProject")
            .execute(projectDescription, date1, projectName, status, teamId));
        console.log("hehe2");
        loader.stop("createProjectLoader");
        _application.container
          .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
          .execute("Uspješno ste kreirali projekt");
        _store.update({
          isCreateProjectModalVisible: false
        });
      } catch (error) {
        console.log("ufatio sam ga");
        loader.stop("createProjectLoader");
        _application.container
          .resolve<ShowErrorMessageInteractor>("showErrorMessage")
          .execute(error.message);
      }
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
      createProject,
      onCancelProjectModalButtonClick,
      onCreateProjectBtnClick,
      onChangeProjectDescriptionValue,
      onChangeProjectEndDateValue,
      onChangeProjectNameValue,
      onChangeProjectStatusValue,
      updateTeamDetails
    };
  },
  defaultState
);

export default TeamPresenter;
