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
import { IUser } from "../../model/user/User";
import {
  TSelectValuePresentationModel,
  THomePresenter
} from "../main/HomePresenter";
import { ITeamInvite } from "../../model/team/TeamInvite";
import InviteUserToTeamInteractor from "../../interactor/team/InviteUserToTeamInteractor";
import GetAllUsersInteractor from "../../interactor/user/GetAllUsersInteractor";
import GetUserListByEmailInteractor from "../../interactor/user/GetUserListByEmailInteractor";
import CreateTeamInteractor from "../../interactor/team/CreateTeamInteractor";

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
  userList: IUser[];
  selectedUsers: TSelectValuePresentationModel[];
  userProfile: IUser;
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
  showProjectPage(ProjectId: number): void;
  loadUserList(userList: IUser[]): void;
  loadTeamInvitesForUser(teamInvitesForUser: ITeamInvite[]): void;
  loadUserProfile(userProfile: IUser): void;
  onChangeSelectUserList(value: TSelectValuePresentationModel[]): void;
  inviteUserToTeam(invitedUserId: number, teamId: number, userId: number): void;
  onChangeSelectSearch(value: string): void;
  onDropdownVisibleChange(value: boolean): void;
}

const defaultState: TTeamPresenter = {
  teamDetails: {} as ITeamDetails,
  teamProjects: [],
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false,
  isCreateProjectModalVisible: false,
  project: {} as IProject,
  activeTeamMembers: [],
  userList: [],
  selectedUsers: [],
  userProfile: {} as IUser
};

const TeamPresenter = withStore<ITeamPresenter, TTeamPresenter>(
  ({ application, store, loader, translate }): ITeamPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TTeamPresenter>();

    loader.start("userListLoader");

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
          const selectedUsers = _store.getState<THomePresenter>().selectedUsers;
          const userProfile = _store.getState<THomePresenter>().userProfile;
          const response = await _application.container
            .resolve<CreateTeamInteractor>("createTeam")
            .execute(teamDetails.description, teamDetails.name, userProfile.id);
          _application.container
            .resolve<UpdateTeamDetailsInteractor>("updateTeamDetails")
            .execute(teamDetails);
          loader.stop("editTeamLoader");
          _application.container
            .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
            .execute("Changes successfully saved");
          selectedUsers.forEach(element => {
            inviteUserToTeam(
              parseInt(element.key, 10),
              response.teamId,
              userProfile.id
            );
          });
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

    const showProjectPage = (projectId: number) => {
      application.navigator.replace({ pathname: `/project/${projectId}` });
    };

    const loadUserList = (userList: IUser[]) => {
      _store.update({
        userList
      });
      loader.stop("userListLoader");
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

    const inviteUserToTeam = async (
      invitedUserId: number,
      teamId: number,
      userId: number
    ) => {
      await _application.container
        .resolve<InviteUserToTeamInteractor>("inviteUserToTeam")
        .execute(invitedUserId, teamId, userId);
    };

    const onChangeSelectSearch = async (value: string) => {
      loader.start("userListLoader");
      _store.update({
        userList: []
      });
      let userList;
      if (value !== "") {
        userList = await application.container
          .resolve<GetUserListByEmailInteractor>("getUserListByEmail")
          .execute(value);
      } else {
        userList = await application.container
          .resolve<GetAllUsersInteractor>("getAllUsers")
          .execute();
      }

      _store.update({
        userList
      });
      loader.stop("userListLoader");
    };

    const onDropdownVisibleChange = async (value: boolean) => {
      if (!value) {
        loader.start("userListLoader");
        _store.update({
          userList: []
        });
        const userList = await application.container
          .resolve<GetAllUsersInteractor>("getAllUsers")
          .execute();
        _store.update({ userList });
        loader.stop("userListLoader");
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
      loadActiveTeamMembersList,
      showProjectPage,
      loadUserList,
      loadTeamInvitesForUser,
      loadUserProfile,
      onChangeSelectUserList,
      inviteUserToTeam,
      onChangeSelectSearch,
      onDropdownVisibleChange
    };
  },
  defaultState
);

export default TeamPresenter;
