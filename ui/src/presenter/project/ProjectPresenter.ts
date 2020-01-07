import { IProject } from "../../model/project/Project";
import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import UpdateProjectDetailsInteractor from "../../interactor/project/UpdateProjectDetailsInteractor";
import { Moment } from "moment";

export interface TProjectPresenter extends TLoadingAwarePresenter {
  project: IProject;
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
  /* isCreateIterationModalVisible: boolean;
  iterationName: string;
  iterationDescription: string;
  iterationEndDate: Moment; */
}

export interface IProjectPresenter extends TProjectPresenter, TPresentable {
  loadProject(project: IProject): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  onChangeProjectData(key: string, value: any): void;
  updateProjectDetails(): void;
  /* createIteration(): void;
  onCancelIterationModalButtonClick(): void;
  onChangeIterationNameValue(value: string): void;
  onChangeIterationDescriptionValue(value: string): void;
  onChangeIterationEndDateValue(value: Moment): void; */
}

const defaultState: TProjectPresenter = {
  project: {} as IProject,
  isEditableForm: false,
  //editValidationErrors: undefined,
  editButtonDisabled: false
  /* isCreateIterationModalVisible: false,
  iterationName: "",
  iterationDescription: "",
  iterationEndDate: {} as Moment */
};

const ProjectPresenter = withStore<IProjectPresenter, TProjectPresenter>(
  ({ application, store, loader, translate }): IProjectPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TProjectPresenter>();

    const loadProject = (project: IProject) => {
      return _store.update({
        project
      });
    };

    const onEditBtnClick = () => {
      _store.update({ isEditableForm: true });
    };

    const onCancelBtnClick = () => {
      _store.update({ isEditableForm: false });
    };

    const validateEditProjectForm = () => {
      const project = _store.getState<TProjectPresenter>().project;
      let editValidationErrors = _store.getState<TProjectPresenter>()
        .editValidationErrors;
      editValidationErrors = {
        name: [],
        description: [],
        endDate: []
      };
      if (!project.name) {
        editValidationErrors.name.push("The Name field is required.");
      }
      if (!project.description) {
        editValidationErrors.description.push(
          "The Description field is required."
        );
      }
      if (
        project.endDate === null ||
        Object.entries(project.endDate).length === 0
      ) {
        editValidationErrors.endDate.push("The End Date field is required.");
      }
      _store.update({
        editButtonDisabled:
          editValidationErrors.name.length ||
          editValidationErrors.description.length ||
          editValidationErrors.endDate.length
            ? true
            : false,
        editValidationErrors
      });
    };

    const updateProjectDetails = async () => {
      validateEditProjectForm();
      const editValidationErrors = _store.getState<TProjectPresenter>()
        .editValidationErrors;
      if (
        !(
          editValidationErrors.name.length ||
          editValidationErrors.description.length ||
          editValidationErrors.endDate.length
        )
      ) {
        try {
          loader.start("editProjectLoader");
          const project = _store.getState<TProjectPresenter>().project;
          _application.container
            .resolve<UpdateProjectDetailsInteractor>("updateProjectDetails")
            .execute(project);
          loader.stop("editProjectLoader");
          _application.container
            .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
            .execute("Changes successfully saved");
          _store.update({
            project,
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

    const onChangeProjectData = (key: string, value: any) => {
      let project = _store.getState<TProjectPresenter>().project;
      project[key] = value;
      _store.update({ project });
      const editValidationErrors = _store.getState<TProjectPresenter>()
        .editValidationErrors;
      editValidationErrors && validateEditProjectForm();
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      loadProject,
      translate,
      onEditBtnClick,
      onCancelBtnClick,
      onChangeProjectData,
      updateProjectDetails
      /* createIteration,
      onChangeIterationDescriptionValue,
      onChangeIterationEndDateValue,
      onChangeIterationNameValue */
    };
  },
  defaultState
);

export default ProjectPresenter;
