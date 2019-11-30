import withStore, { TPresentable, TLoadingAwarePresenter } from "../withStore";
import Application from "../../Application";

export interface THomePresenter extends TLoadingAwarePresenter {}

export interface IHomePresenter extends THomePresenter, TPresentable {}

const defaultState: THomePresenter = {};

const HomePresenter = withStore<IHomePresenter, THomePresenter>(
  ({ application, store, loader, translate }): IHomePresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<THomePresenter & TLoadingAwarePresenter>();

    return {
      ...state,

      store: _store,
      loader,
      application: _application,
      translate
    };
  },
  defaultState
);

export default HomePresenter;
