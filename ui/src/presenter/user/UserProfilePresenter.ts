import withStore, { TLoadingAwarePresenter, TPresentable } from "../withStore";
import Application from "../../Application";
import { IUser } from "../../model/user/User";
import { ICountry, TCountry } from "../../model/country/Country";
import UpdateUserProfileInteractor from "../../interactor/user/UpdateUserProfileInteractor";
import ShowSuccessMessageInteractor from "../../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../../interactor/notifications/ShowErrorMessageInteractor";
import GetUserProfileInteractor from "../../interactor/user/GetUserProfileInteractor";

export interface TUserProfilePresenter extends TLoadingAwarePresenter {
  userProfile: IUser;
  countries: ICountry[];
  isEditableForm: boolean;
  editValidationErrors?: any;
  editButtonDisabled: boolean;
}
export interface IUserProfilePresenter
  extends TUserProfilePresenter,
    TPresentable {
  loadUserProfile(userProfile: IUser): void;
  loadCountries(countries: ICountry[]): void;
  onEditBtnClick(): void;
  onCancelBtnClick(): void;
  onChangeUserData(key: string, value: any): void;
  updateUserProfile(): void;
}

const defaultState: TUserProfilePresenter = {
  userProfile: {} as IUser,
  countries: [],
  isEditableForm: false,
  editValidationErrors: undefined,
  editButtonDisabled: false
};

const UserProfilePresenter = withStore<
  IUserProfilePresenter,
  TUserProfilePresenter
>(({ application, store, loader, translate }): IUserProfilePresenter => {
  const _store = store;
  const _application: Application = application;
  const state = _store.getState<TUserProfilePresenter>();

  const loadUserProfile = (userProfile: IUser) => {
    return _store.update({
      userProfile
    });
  };

  const loadCountries = (countries: ICountry[]) => {
    _store.update({ countries });
  };

  const onEditBtnClick = () => {
    _store.update({ isEditableForm: true });
  };

  const onCancelBtnClick = () => {
    _store.update({ isEditableForm: false });
  };

  const validateEditUserForm = () => {
    const userProfile = _store.getState<TUserProfilePresenter>().userProfile;
    let editValidationErrors = _store.getState<TUserProfilePresenter>()
      .editValidationErrors;
    editValidationErrors = {
      firstName: [],
      lastName: [],
      email: [],
      phone: [],
      country: []
    };
    if (!userProfile.firstName) {
      editValidationErrors.firstName.push("The First Name field is required.");
    }
    if (!userProfile.lastName) {
      editValidationErrors.lastName.push("The Last Name field is required.");
    }
    if (!userProfile.email) {
      editValidationErrors.email.push("The Email field is required.");
    }
    if (!userProfile.phone) {
      editValidationErrors.phone.push("The Phone field is required.");
    }
    if (userProfile.phone && userProfile.phone.length < 10) {
      editValidationErrors.phone.push(
        "Phone must contain minimum 10 characters"
      );
    }
    if (userProfile.country && !userProfile.country.id) {
      editValidationErrors.country.push("The Country field is required.");
    }
    _store.update({
      editButtonDisabled:
        editValidationErrors.firstName.length ||
        editValidationErrors.lastName.length ||
        editValidationErrors.email.length ||
        editValidationErrors.phone.length ||
        editValidationErrors.country.length
          ? true
          : false,
      editValidationErrors
    });
  };

  const onChangeUserData = (key: string, value: any) => {
    let userProfile = _store.getState<TUserProfilePresenter>().userProfile;
    if (key === "country") {
      const countries = _store.getState<TUserProfilePresenter>().countries;
      const country = countries.filter(country => country.name === value)[0];
      userProfile[key] = {
        id: country ? country.id : undefined,
        name: country ? country.name : undefined
      } as TCountry;
    } else {
      userProfile[key] = value;
    }
    _store.update({ userProfile });
    const editValidationErrors = _store.getState<TUserProfilePresenter>()
      .editValidationErrors;
    editValidationErrors && validateEditUserForm();
  };

  const updateUserProfile = async () => {
    validateEditUserForm();
    const editValidationErrors = _store.getState<TUserProfilePresenter>()
      .editValidationErrors;
    if (
      !(
        editValidationErrors.firstName.length ||
        editValidationErrors.lastName.length ||
        editValidationErrors.email.length ||
        editValidationErrors.phone.length ||
        editValidationErrors.country.length
      )
    ) {
      try {
        loader.start("editUserLoader");
        const userProfile = _store.getState<TUserProfilePresenter>()
          .userProfile;
        let result = await _application.container
          .resolve<UpdateUserProfileInteractor>("updateUserProfile")
          .execute(userProfile);
        const countries = _store.getState<TUserProfilePresenter>().countries;
        result.id = userProfile.id;
        result.country = countries.filter(
          country => country.id === result.country.id
        )[0];
        loader.stop("editUserLoader");
        _application.container
          .resolve<ShowSuccessMessageInteractor>("showSuccessMessage")
          .execute("Changes successfully saved");
        _store.update({
          userProfile: result
        });
      } catch (error) {
        loader.stop("editUserLoader");
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

  return {
    ...state,
    store: _store,
    loader,
    application: _application,
    translate,
    loadUserProfile,
    loadCountries,
    onEditBtnClick,
    onCancelBtnClick,
    onChangeUserData,
    updateUserProfile
  };
}, defaultState);

export default UserProfilePresenter;
