import Application from "../Application";
import { IStore } from "../model/runtime/state/Store";
import { ITranslationService } from "../service/locale/TranslationService";

export interface TLoadingAwarePresenter {
  loaders?: any;
}

export interface ILocalizablePresenter {
  (key: string, interpolation?: {}, pluralize?: undefined): string;
}

export interface IProgressIndicatorManager {
  stop(...loaders: string[]): void;
  start(...loaders: string[]): void;
}
export interface TPresentable {
  application: Application;
  store: IStore;
  loader: IProgressIndicatorManager;
  translate: ILocalizablePresenter;
}

export interface IPresentable<T extends any> {
  (presenter: TPresentable): T;
}

function withStore<K extends any, T extends any>(
  presenter: IPresentable<K>,
  defaultState: T,
  topic?: string
) {
  return ({
    application,
    store,
    initialState
  }: {
    application: Application;
    store?: IStore;
    initialState?: T;
  }) => {
    let _initialState = {
      ...(defaultState || {}),
      ...(initialState || {})
    } as K;
    _initialState.loaders = {};
    let _store = store ? store : application.store;
    _store.update(_initialState);
    const translate = application.container.resolve<ITranslationService>(
      "translationService"
    ).get;
    const loader: IProgressIndicatorManager = {
      stop: (...loaders: string[]) => {
        let _loaders = _store.getState<TLoadingAwarePresenter>() as {};
        loaders.forEach(loader => (_loaders[loader] = false));
        _store.update({
          loaders: _loaders
        });
      },
      start: (...loaders: string[]) => {
        let _loaders = _store.getState<TLoadingAwarePresenter>() as {};
        loaders.forEach(loader => (_loaders[loader] = true));
        _store.update({
          loaders: _loaders
        });
      }
    };

    return presenter({
      application,
      store: _store,
      loader,
      translate: translate
    });
  };
}

export default withStore;
