import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { ICountry, TCountry } from "../../model/country/Country";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import RegisterInteractor from "../../interactor/authentication/RegisterInteractor";
import { Errors } from "../../common/Constants";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import LoginInteractor from "../../interactor/authentication/LoginInteractor";

export interface TRegisterPresentationModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  country: ICountry;
}

export interface TRegistrationPresenter extends TLoadingAwarePresenter {
  registrationData: TRegisterPresentationModel;
  countries: ICountry[];
  registerValidationErrors?: any;
  registerButtonDisabled: boolean;
}
export interface IRegistrationPresenter
  extends TRegistrationPresenter,
    TPresentable {
  loadCountries(countries: ICountry[]): void;
  onChangeRegistrationData(key: string, value: any): void;
  showLoginPage(): void;
  register(): void;
}

const defaultState: TRegistrationPresenter = {
  registrationData: {} as TRegisterPresentationModel,
  countries: [],
  registerValidationErrors: undefined,
  registerButtonDisabled: false
};

const RegistrationPresenter = withStore<
  IRegistrationPresenter,
  TRegistrationPresenter
>(({ application, store, loader, translate }): IRegistrationPresenter => {
  const _store = store;
  const _application: Application = application;
  const state = _store.getState<TRegistrationPresenter>();

  const loadCountries = (countries: ICountry[]) => {
    _store.update({
      countries
    });
  };

  const onChangeRegistrationData = (key: string, value: any) => {
    let registrationData = _store.getState<TRegistrationPresenter>()
      .registrationData;
    if (key === "country") {
      const countries = _store.getState<TRegistrationPresenter>().countries;
      const country = countries.filter(country => country.name === value)[0];
      registrationData[key] = { id: country.id } as TCountry;
    } else {
      registrationData[key] = value;
    }
    const registerValidationErrors = _store.getState<TRegistrationPresenter>()
      .registerValidationErrors;
    registerValidationErrors && validateRegistrationForm();
  };

  const showLoginPage = () => {
    application.navigator.push({ pathname: "/login" });
  };

  const validateRegistrationForm = () => {
    const registrationData = _store.getState<TRegistrationPresenter>()
      .registrationData;
    let registerValidationErrors = _store.getState<TRegistrationPresenter>()
      .registerValidationErrors;
    registerValidationErrors = {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
      phone: [],
      country: []
    };
    if (!registrationData.firstName) {
      registerValidationErrors.firstName.push(
        "The First Name field is required."
      );
    }
    if (!registrationData.lastName) {
      registerValidationErrors.lastName.push(
        "The Last Name field is required."
      );
    }
    if (!registrationData.email) {
      registerValidationErrors.email.push("The Email field is required.");
    }
    if (!registrationData.password) {
      registerValidationErrors.password.push("The Password field is required.");
    }
    if (registrationData.password && registrationData.password.length < 5) {
      registerValidationErrors.password.push(
        "Password must contain minimum 5 characters."
      );
    }
    if (!registrationData.phone) {
      registerValidationErrors.phone.push("The Phone field is required.");
    }
    if (registrationData.phone && registrationData.phone.length < 10) {
      registerValidationErrors.phone.push(
        "Phone must contain minimum 10 characters"
      );
    }
    if (!registrationData.country) {
      registerValidationErrors.country.push("The Country field is required.");
    }
    _store.update({
      registerButtonDisabled:
        registerValidationErrors.firstName.length ||
        registerValidationErrors.lastName.length ||
        registerValidationErrors.email.length ||
        registerValidationErrors.password.length ||
        registerValidationErrors.phone.length ||
        registerValidationErrors.country.length
          ? true
          : false,
      registerValidationErrors
    });
  };

  const register = async () => {
    validateRegistrationForm();
    const registerValidationErrors = _store.getState<TRegistrationPresenter>()
      .registerValidationErrors;
    if (
      !(
        registerValidationErrors.firstName.length ||
        registerValidationErrors.lastName.length ||
        registerValidationErrors.email.length ||
        registerValidationErrors.password.length ||
        registerValidationErrors.phone.length ||
        registerValidationErrors.country.length
      )
    ) {
      try {
        loader.start("registerLoader");
        const registrationData = _store.getState<TRegistrationPresenter>()
          .registrationData;
        await _application.container
          .resolve<RegisterInteractor>("register")
          .execute(
            registrationData.firstName,
            registrationData.lastName,
            registrationData.email,
            registrationData.password,
            registrationData.phone,
            registrationData.country
          );
        loader.stop("registerLoader");
        _application.container
          .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
          .execute("Uspješno ste registrovani");
        _application.container
          .resolve<LoginInteractor>("login")
          .execute(registrationData.email, registrationData.password);
      } catch (error) {
        loader.stop("registerLoader");
        _application.container
          .resolve<ShowErrorMessageInteractor>("showErrorMessage")
          .execute(error.message);
      }
    } else {
      _store.update({
        registerButtonDisabled: true
      });
    }
  };

  return {
    ...state,
    store: _store,
    loader,
    application: _application,
    translate,
    loadCountries,
    onChangeRegistrationData,
    showLoginPage,
    register
  };
}, defaultState);

export default RegistrationPresenter;
