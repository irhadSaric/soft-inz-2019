import withStore, { TPresentable, TLoadingAwarePresenter } from "../withStore";
import Application from "../../Application";
import { IUser } from "../../model/user/User";

export interface THomePresenter extends TLoadingAwarePresenter {
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
}

export interface TSelectValuePresentationModel {
  key: string;
  value: string;
}

const defaultState: THomePresenter = {
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
      onChangeTeamNameValue
    };
  },
  defaultState
);

export default HomePresenter;
