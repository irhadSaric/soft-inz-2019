import withStore, { TPresentable, TLoadingAwarePresenter } from "../withStore";
import Application from "../../Application";
import { IUser } from "../../model/user/User";
import CreateTeamInteractor from "../../interactor/team/CreateTeamInteractor";
import { message } from "antd";

export interface TCreateTeamPresentationModel {
  description: string;
  logo: string;
  nickname: string;
  teamName: string;
  userId: number;
}

export interface THomePresenter extends TLoadingAwarePresenter {
  userProfile: IUser; //proba
  createTeamData: TCreateTeamPresentationModel;
  isCreateTeamModalVisible: boolean;
  userList: IUser[];
  selectedUsers: TSelectValuePresentationModel[];
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
}

export interface TSelectValuePresentationModel {
  key: string;
  value: string;
}

const defaultState: THomePresenter = {
  userProfile: {} as IUser, //proba
  createTeamData: {} as TCreateTeamPresentationModel,
  isCreateTeamModalVisible: false,
  userList: [],
  selectedUsers: [],
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
        userProfile //proba
      });
    };

    const onCreateTeamBtnClick = () => {
      _store.update({
        isCreateTeamModalVisible: true
      });
    };

    const onCancelTeamModalButtonClick = () => {
      _store.update({
        isCreateTeamModalVisible: false
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
    };

    const onChangeProjectDescriptionValue = (value: string) => {
      _store.update({
        projectDescription: value
      });
    };

    const createTeam = async () => {
      loader.start("createTeamLoader");
      const createTeamData = _store.getState<THomePresenter>().createTeamData;
      const teamName = _store.getState<THomePresenter>().teamName;
      const projectDescription = _store.getState<THomePresenter>()
        .projectDescription;
      const userProfile = _store.getState<THomePresenter>().userProfile;
      console.log("useeeeeeeeeeeeeeeeer", userProfile.id);
      await _application.container
        .resolve<CreateTeamInteractor>("createTeam")
        .execute(
          projectDescription,
          "logo", // createTeamData.logo,
          "nickname", // createTeamData.nickname,
          teamName,
          userProfile.id //createTeamData.userId
        );
      //success();
      _store.update({
        isCreateTeamModalVisible: false
      });
    };

    const success = () => {
      message.config({
        top: 200,
        duration: 2,
        maxCount: 3
      });
      message.success("This is a success message");
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
      loadUserProfile //proba
    };
  },
  defaultState
);

export default HomePresenter;
