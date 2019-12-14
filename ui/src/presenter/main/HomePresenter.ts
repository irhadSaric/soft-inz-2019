import withStore, { TPresentable, TLoadingAwarePresenter } from "../withStore";
import Application from "../../Application";
import { IUser } from "../../model/user/User";
import CreateTeamInteractor from "../../interactor/team/CreateTeamInteractor";
import { message } from "antd";
import InviteUserToTeamInteractor from "../../interactor/team/InviteUserToTeamInteractor";
import RespondToPendingInviteInteractor from "../../interactor/team/RespondToPendingInviteInteractor";
import { ITeam } from "../../model/team/Team";
import {
  TTeamInviteResponse,
  ITeamInviteResponse
} from "../../model/team/TeamInviteResponse";
import GetTeamInvitesForUserInteractor from "../../interactor/team/GetTeamInvitesForUserInteractor";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";

export interface TCreateTeamPresentationModel {
  description: string;
  logo: string;
  nickname: string;
  teamName: string;
  userId: number;
}

export interface THomePresenter extends TLoadingAwarePresenter {
  userProfile: IUser;
  createTeamData: TCreateTeamPresentationModel;
  isCreateTeamModalVisible: boolean;
  createTeamValidationErrors?: any;
  userList: IUser[];
  teamList: ITeam[];
  selectedUsers: TSelectValuePresentationModel[];
  teamInvitesForUser: ITeamInviteResponse[];
  teamName: string;
  projectDescription: string;
}

export interface IHomePresenter extends THomePresenter, TPresentable {
  onCreateTeamBtnClick(): void;
  onCancelTeamModalButtonClick(): void;
  loadUserList(userList: IUser[]): void;
  onChangeSelectUserList(value: TSelectValuePresentationModel[]): void;
  onChangeTeamNameValue(value: string): void;
  onChangeProjectDescriptionValue(value: string): void;
  createTeam(): void;
  loadUserProfile(userProfile: IUser): void; // proba
  inviteUserToTeam(invitedUserId: number, teamId: number, userId: number): void;
  loadTeamList(teamList: ITeam[]): void;
  loadTeamInvitesForUser(teamInvitesForUser: ITeamInviteResponse[]): void;
  respondToPendingInvite(userId: number, teamId: number, accept: boolean): void;
}

export interface TSelectValuePresentationModel {
  key: string;
  value: string;
}

const defaultState: THomePresenter = {
  userProfile: {} as IUser,
  createTeamData: {} as TCreateTeamPresentationModel,
  isCreateTeamModalVisible: false,
  createTeamValidationErrors: undefined,
  userList: [],
  teamList: [],
  selectedUsers: [],
  teamInvitesForUser: [],
  teamName: "",
  projectDescription: ""
};

const HomePresenter = withStore<IHomePresenter, THomePresenter>(
  ({ application, store, loader, translate }): IHomePresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<THomePresenter & TLoadingAwarePresenter>();

    const loadUserProfile = (userProfile: IUser) => {
      return _store.update({
        userProfile
      });
    };

    const onCreateTeamBtnClick = () => {
      _store.update({
        isCreateTeamModalVisible: true
      });
    };

    const onCancelTeamModalButtonClick = () => {
      _store.update({
        isCreateTeamModalVisible: false,
        teamName: "",
        projectDescription: "",
        selectedUsers: []
      });
    };

    const loadUserList = (userList: IUser[]) => {
      _store.update({
        userList
      });
    };

    const onChangeSelectUserList = (value: TSelectValuePresentationModel[]) => {
      _store.update({ selectedUsers: value });
    };

    const onChangeTeamNameValue = (value: string) => {
      _store.update({
        teamName: value
      });
      const createTeamValidationErrors = _store.getState<THomePresenter>()
        .createTeamValidationErrors;
      createTeamValidationErrors && validateCreateTeamForm();
    };

    const onChangeProjectDescriptionValue = (value: string) => {
      _store.update({
        projectDescription: value
      });
      const createTeamValidationErrors = _store.getState<THomePresenter>()
        .createTeamValidationErrors;
      createTeamValidationErrors && validateCreateTeamForm();
    };

    const loadTeamList = (teamList: ITeam[]) => {
      _store.update({
        teamList
      });
    };

    const loadTeamInvitesForUser = (
      teamInvitesForUser: ITeamInviteResponse[]
    ) => {
      return _store.update({
        teamInvitesForUser
      });
    };

    const validateCreateTeamForm = () => {
      const teamName = _store.getState<THomePresenter>().teamName;
      const projectDescription = _store.getState<THomePresenter>()
        .projectDescription;
      let createTeamValidationErrors = _store.getState<THomePresenter>()
        .createTeamValidationErrors;
      createTeamValidationErrors = {
        teamName: [],
        projectDescription: []
      };
      if (!teamName) {
        createTeamValidationErrors.teamName.push(
          "The Team Name field is required."
        );
      }
      if (!projectDescription) {
        createTeamValidationErrors.projectDescription.push(
          "The Description field is required."
        );
      }
      _store.update({
        createTeamValidationErrors
      });
    };

    const createTeam = async () => {
      validateCreateTeamForm();
      const createTeamValidationErrors = _store.getState<THomePresenter>()
        .createTeamValidationErrors;
      if (
        !(
          createTeamValidationErrors.teamName.length ||
          createTeamValidationErrors.projectDescription.length
        )
      )
        try {
          loader.start("createTeamLoader");
          const createTeamData = _store.getState<THomePresenter>()
            .createTeamData;
          const teamName = _store.getState<THomePresenter>().teamName;
          const projectDescription = _store.getState<THomePresenter>()
            .projectDescription;
          const selectedUsers = _store.getState<THomePresenter>().selectedUsers;
          const userProfile = _store.getState<THomePresenter>().userProfile;
          console.log(selectedUsers);
          const response = await _application.container
            .resolve<CreateTeamInteractor>("createTeam")
            .execute(projectDescription, teamName, userProfile.id);
          loader.stop("registerLoader");
          _application.container
            .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
            .execute("Uspješno ste kreirali tim");
          selectedUsers.forEach(element => {
            inviteUserToTeam(
              Number(element.key),
              response.teamId,
              userProfile.id
            );
          });
          _store.update({
            isCreateTeamModalVisible: false
          });
        } catch (error) {
          loader.stop("registerLoader");
          _application.container
            .resolve<ShowErrorMessageInteractor>("showErrorMessage")
            .execute(error.message);
        }
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

    const respondToPendingInvite = async (
      userId: number,
      teamId: number,
      accept: boolean
    ) => {
      await _application.container
        .resolve<RespondToPendingInviteInteractor>("respondToPendingInvite")
        .execute(userId, teamId, accept);
      const invites = await _application.container
        .resolve<GetTeamInvitesForUserInteractor>("getTeamInvitesForUser")
        .execute(userId);
      _store.update({
        teamInvitesForUser: invites
      });
    };

    return {
      ...state,

      store: _store,
      loader,
      application: _application,
      translate,
      onCreateTeamBtnClick,
      onCancelTeamModalButtonClick,
      loadUserList,
      onChangeSelectUserList,
      onChangeProjectDescriptionValue,
      onChangeTeamNameValue,
      createTeam,
      inviteUserToTeam,
      loadTeamInvitesForUser,
      loadUserProfile,
      loadTeamList,
      respondToPendingInvite
    };
  },
  defaultState
);

export default HomePresenter;
