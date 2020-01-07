import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ITeamDetails } from "../../model/team/TeamDetails";
import CreateProjectInteractor from "../../interactor/project/CreateProjectInteractor";
import UpdateTeamDetailsInteractor from "../../interactor/team/UpdateTeamDetailsInteractor";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import { ITeamProject } from "../../model/team/TeamProject";
import { IActiveTeamMember } from "../../model/team/ActiveTeamMember";
import { IProject } from "../../model/project/Project";

export interface TTeamPresenter extends TLoadingAwarePresenter {
  teamDetails: ITeamDetails;
  teamProjects: ITeamProject[];
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  teamId?: number;
  isCreateProjectModalVisible: boolean;
  project: IProject;
  activeTeamMembers: IActiveTeamMember[];
  createProjectValidationErrors?: any;
}
export interface ITeamPresenter extends TTeamPresenter, TPresentable {
  loadTeamDetails(teamDetails: ITeamDetails): void;
  loadTeamProjects(teamProjects: ITeamProject[]): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  onChangeTeamData(key: string, value: any): void;
  createProject(): void;
  onCreateProjectBtnClick(): void;
  onCancelProjectModalButtonClick(): void;
  onChangeProjectData(key: string, value: any): void;
  updateTeamDetails(): void;
  loadActiveTeamMembersList(activeTeamMembers: IActiveTeamMember[]): void;
}

const defaultState: TTeamPresenter = {
  teamDetails: {} as ITeamDetails,
  teamProjects: [],
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,
  isCreateProjectModalVisible: false,
  project: {} as IProject,
  activeTeamMembers: []
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

    const onChangeProjectData = (key: string, value: any) => {
      let project = _store.getState<TTeamPresenter>().project;
      project[key] = value;
      _store.update({ project });
    };

    const onCancelProjectModalButtonClick = () => {
      _store.update({
        isCreateProjectModalVisible: false,
        projectName: "",
        projectDescription: ""
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

    const validateCreateProjectForm = () => {
      const project = _store.getState<TTeamPresenter>().project;
      let createProjectValidationErrors = _store.getState<TTeamPresenter>()
        .createProjectValidationErrors;
      createProjectValidationErrors = {
        projectName: [],
        projectDescription: [],
        projectEndDate: []
      };
      if (!project.name) {
        createProjectValidationErrors.projectName.push(
          "The Project Name field is required."
        );
      }
      if (!project.description) {
        createProjectValidationErrors.projectDescription.push(
          "The Description field is required."
        );
      }
      if (
        typeof project.endDate === "undefined" ||
        Object.entries(project.endDate).length === 0
      ) {
        createProjectValidationErrors.projectEndDate.push(
          "The End Date field is required."
        );
      }
      _store.update({
        createProjectValidationErrors
      });
    };

    const createProject = async () => {
      validateCreateProjectForm();
      const createProjectValidationErrors = _store.getState<TTeamPresenter>()
        .createProjectValidationErrors;
      if (
        !(
          createProjectValidationErrors.projectName.length ||
          createProjectValidationErrors.projectDescription.length ||
          createProjectValidationErrors.projectEndDate.length
        )
      )
        try {
          loader.start("createProjectLoader");
          const project = _store.getState<TTeamPresenter>().project;
          const teamId = _store.getState<TTeamPresenter>().teamId;
          teamId &&
            (await _application.container
              .resolve<CreateProjectInteractor>("createProject")
              .execute(
                project.description,
                project.endDate,
                project.name,
                teamId
              ));
          loader.stop("createProjectLoader");
          _application.container
            .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
            .execute("You have successfully created a project");
          _store.update({
            isCreateProjectModalVisible: false
          });
        } catch (error) {
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
      loadTeamProjects,
      translate,
      onEditBtnClick,
      onCancelBtnClick,
      onChangeTeamData,
      createProject,
      onCancelProjectModalButtonClick,
      onCreateProjectBtnClick,
      onChangeProjectData,
      updateTeamDetails,
      loadActiveTeamMembersList
    };
  },
  defaultState
);

export default TeamPresenter;
