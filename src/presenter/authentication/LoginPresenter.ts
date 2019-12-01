import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import LoginInteractor from "../../interactor/authentication/LoginInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";

export interface TLoginPresenter extends TLoadingAwarePresenter {
  email: string;
  password: string;
  loginButtonDisabled: boolean;
}
export interface ILoginPresenter extends TLoginPresenter, TPresentable {
  login(): void;
  setEmail(email: string): void;
  setPassword(password: string): void;
  showRegistrationPage(): void;
}

const defaultState: TLoginPresenter = {
  email: "",
  password: "",
  loginButtonDisabled: true
};

const LoginPresenter = withStore<ILoginPresenter, TLoginPresenter>(
  ({ application, store, loader, translate }): ILoginPresenter => {
    const _store = store;
    const _application: Application = application;
    const state = _store.getState<TLoginPresenter>();

    const setEmail = (email: string) => {
      _store.update({
        email
      });
      setLoginButtonDisabled();
    };

    const setPassword = (password: string) => {
      _store.update({
        password
      });
      setLoginButtonDisabled();
    };

    const setLoginButtonDisabled = () => {
      const { email, password } = _store.getState<TLoginPresenter>();
      if (email && password) {
        return _store.update({ loginButtonDisabled: false });
      }
      return _store.update({ loginButtonDisabled: true });
    };

    const login = async () => {
      loader.start("loginLoader");
      const { email, password } = _store.getState<TLoginPresenter>();
      let error = await _application.container
        .resolve<LoginInteractor>("login")
        .execute(email, password);

      loader.stop("loginLoader");
      error &&
        _application.container
          .resolve<ShowErrorMessageInteractor>("showErrorMessage")
          .execute(error.message);
    };

    const showRegistrationPage = () => {
      application.navigator.push({ pathname: "/register" });
    };

    return {
      ...state,
      store: _store,
      loader,
      application: _application,
      translate,
      login,
      setPassword,
      setEmail,
      showRegistrationPage
    };
  },
  defaultState
);

export default LoginPresenter;
