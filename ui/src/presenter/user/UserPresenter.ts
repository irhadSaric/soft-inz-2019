import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { IUser } from "../../model/user/User";

export interface TUserPresenter extends TLoadingAwarePresenter {
  users: IUser[];
}
export interface IUserPresenter extends TUserPresenter, TPresentable {
  loadUsers(users: IUser[]): void;
}

const defaultState: TUserPresenter = {
  users: []
};

const UserPresenter = withStore<IUserPresenter, TUserPresenter>(
  ({ application, store, loader, translate }): IUserPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TUserPresenter>();

    const loadUsers = (users: IUser[]) => {
      return _store.update({
        users
      });
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      loadUsers
    };
  },
  defaultState
);

export default UserPresenter;
