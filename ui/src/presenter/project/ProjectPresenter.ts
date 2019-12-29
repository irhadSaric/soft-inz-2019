import { IProject } from "../../model/project/Project";
import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";

export interface TProjectPresenter extends TLoadingAwarePresenter {
  project: IProject;
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
}

export interface IProjectPresenter extends TProjectPresenter, TPresentable {
  loadProject(project: IProject): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  onChangeProjectData(key: string, value: any): void;
  onChangeProjectDescriptionValue(value: string): void;
}

const defaultState: TProjectPresenter = {
  project: {} as IProject,
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false
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
      const teamDetails = _store.getState<TProjectPresenter>().project;
      let editValidationErrors = _store.getState<TProjectPresenter>()
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

    const onChangeProjectData = (key: string, value: any) => {
      let teamDetails = _store.getState<TProjectPresenter>().project;
      _store.update({ teamDetails });
      const editValidationErrors = _store.getState<TProjectPresenter>()
        .editValidationErrors;
      editValidationErrors && validateEditProjectForm();
    };

    const onChangeProjectDescriptionValue = (value: string) => {
      _store.update({
        description: value
      });
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
      onChangeProjectDescriptionValue
    };
  },
  defaultState
);

export default ProjectPresenter;
