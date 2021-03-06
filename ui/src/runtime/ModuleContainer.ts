import {
  createContainer,
  InjectionMode,
  asFunction,
  asClass,
  asValue,
  Constructor,
  BuildResolverOptions,
  Resolver,
  AwilixContainer
} from "awilix";

import IModuleContainer from "./IModuleContainer";
import Application from "../Application";
import Store from "../model/runtime/state/Store";
import Dispatcher from "../model/runtime/state/Dispatcher";
import LocaleProvider from "../service/locale/LocaleProvider";
import { UserPreferences } from "../common/Constants";
import { InMemoryCacheManager } from "../model/runtime/cache/InMemoryCacheManager";
import CachingHttpService from "../service/CachingHttpService";
import HttpService from "../service/HttpService";
import TranslationService from "../service/locale/TranslationService";
import HomeArea from "../areas/HomeArea";
import StorageService from "../service/StorageService";
import CryptographyService from "../service/cryptography/CryptographyService";
import CryptographyProvider from "../model/security/CryptographyProvider";
import RandomValueProvider from "../model/security/RandomValueProvider";
import CookieStorageService from "../service/CookieStorageService";
import InteractorProxy from "../interactor/InteractorProxy";
import ShowHomeInteractor from "../interactor/main/ShowHomeInteractor";
import NotificationService from "../service/notification/NotificationService";
import ShowSuccessMessageInteractor from "../interactor/notifications/ShowSuccessMessageInteractor";
import ShowErrorMessageInteractor from "../interactor/notifications/ShowErrorMessageInteractor";
import ShowWarningMessageInteractor from "../interactor/notifications/ShowWarningMessageInteractor";
import ShowInfoMessageInteractor from "../interactor/notifications/ShowInfoMessageInteractor";
import UserService from "../service/user/UserService";
import UserArea from "../areas/UserArea";
import ShowUserInteractor from "../interactor/user/ShowUserInteractor";
import AuthenticationService from "../service/authentication/AuthenticationService";
import AuthenticationArea from "../areas/AuthenticationArea";
import ShowLoginInteractor from "../interactor/authentication/ShowLoginInteractor";
import LoginInteractor from "../interactor/authentication/LoginInteractor";
import CheckLoginStatusInteractor from "../interactor/authentication/CheckLoginStatusInteractor";
import LoadUserPreferencesInteractor from "../interactor/authentication/LoadUserPreferencesInteractor";
import CredentialsService from "../service/authentication/CredentialsService";
import LogoutInteractor from "../interactor/authentication/LogoutInteractor";
import ShowRegistrationInteractor from "../interactor/authentication/ShowRegistrationInteractor";
import CodebookService from "../service/codebook/CodebookService";
import RegisterInteractor from "../interactor/authentication/RegisterInteractor";
import ShowUserProfileInteractor from "../interactor/user/ShowUserProfileInteractor";
import UpdateUserProfileInteractor from "../interactor/user/UpdateUserProfileInteractor";
import GetUserProfileInteractor from "../interactor/user/GetUserProfileInteractor";
import TeamArea from "../areas/TeamArea";
import ShowTeamInteractor from "../interactor/team/ShowTeamInteractor";
import CreateTeamInteractor from "../interactor/team/CreateTeamInteractor";
import TeamService from "../service/team/TeamService";
import InviteUserToTeamInteractor from "../interactor/team/InviteUserToTeamInteractor";
import RespondToPendingInviteInteractor from "../interactor/team/RespondToPendingInviteInteractor";
import GetTeamInvitesForUserInteractor from "../interactor/team/GetTeamInvitesForUserInteractor";
import ProjectService from "../service/project/ProjectService";
import ProjectArea from "../areas/ProjectArea";
import UpdateTeamDetailsInteractor from "../interactor/team/UpdateTeamDetailsInteractor";
import IterationArea from "../areas/IterationArea";
import ShowIterationInteractor from "../interactor/iteration/ShowIterationInteractor";
import IterationService from "../service/iteration/IterationService";
import ShowProjectInteractor from "../interactor/project/ShowProjectInteractor";
import CreateProjectInteractor from "../interactor/project/CreateProjectInteractor";
import UpdateProjectDetailsInteractor from "../interactor/project/UpdateProjectDetailsInteractor";
import CreateIterationInteractor from "../interactor/iteration/CreateIterationInteractor";
import GetActiveIterationForProjectInteractor from "../interactor/project/GetAcitveIterationForProjectInteractor";
import GetUserListByEmailInteractor from "../interactor/user/GetUserListByEmailInteractor";
import GetAllUsersInteractor from "../interactor/user/GetAllUsersInteractor";

//const DEFAULT_CACHE_TIMEOUT_MS = 15000;
const ModuleContainer = (application: Application): IModuleContainer => {
  const _application = application;
  const _container = createContainer({
    injectionMode: InjectionMode.PROXY
  });

  function withCache(moduleName: string, timeToLiveMs?: number) {
    return c => ({
      httpService: CachingHttpService({
        http: _container.resolve("http"),
        cacheManager: _container.resolve("cacheManager"),
        options: {
          name: moduleName,
          timeToLive: timeToLiveMs !== undefined ? timeToLiveMs : -1
        }
      })
    });
  }

  function asInteractor<T = {}>(
    Type: Constructor<T>,
    opts?: BuildResolverOptions<T>
  ): Resolver<T> {
    return {
      resolve: (container: AwilixContainer) => {
        var interactor = container.build(asClass(Type, opts));
        return (new InteractorProxy({
          interactor,
          application: _application
        }) as any) as T;
      }
    };
  }

  const Config = process.env;
  _container.register({
    application: asValue(_application),
    container: asValue(_container),
    baseUrl: asValue(Config.REACT_APP_API_URL),
    options: asValue(null),
    cacheManager: asFunction(InMemoryCacheManager).singleton(),
    language: asValue(UserPreferences.DEFAULT_LANGUAGE),
    localeProvider: asFunction(LocaleProvider).singleton(),
    dispatcher: asFunction(Dispatcher).singleton(),
    store: asFunction(Store)
      .singleton()
      .inject(c => ({
        dispatcher: _container.resolve("dispatcher"),
        defaultTopic: "app",
        initialState: {}
      })),
    defaultSettings: asValue(Config)
  });

  //services
  _container.register({
    storageService: asFunction(StorageService),
    cookieStorageService: asFunction(CookieStorageService),
    httpService: asFunction(CachingHttpService),
    http: asFunction(HttpService),
    translationService: asFunction(TranslationService),
    cryptographyProvider: asFunction(CryptographyProvider),
    randomValueProvider: asFunction(RandomValueProvider),
    cryptographyService: asFunction(CryptographyService),
    notificationService: asFunction(NotificationService),
    userService: asFunction(UserService),
    authenticationService: asFunction(AuthenticationService),
    credentialsService: asFunction(CredentialsService),
    codebookService: asFunction(CodebookService),
    teamService: asFunction(TeamService),
    projectService: asFunction(ProjectService),
    iterationService: asFunction(IterationService)
  });

  //areas
  _container.register({
    homeArea: asClass(HomeArea).singleton(),
    userArea: asClass(UserArea).singleton(),
    teamArea: asClass(TeamArea).singleton(),
    iterationArea: asClass(IterationArea).singleton(),
    projectArea: asClass(ProjectArea).singleton(),
    authenticationArea: asClass(AuthenticationArea)
  });

  //interactors
  _container.register({
    showHome: asInteractor(ShowHomeInteractor),
    showSuccessMessage: asInteractor(ShowSuccessMessageInteractor),
    showErrorMessage: asInteractor(ShowErrorMessageInteractor),
    showWarningMessage: asInteractor(ShowWarningMessageInteractor),
    showInfoMessage: asInteractor(ShowInfoMessageInteractor),
    showUser: asInteractor(ShowUserInteractor),
    showLogin: asInteractor(ShowLoginInteractor),
    login: asInteractor(LoginInteractor),
    checkLoginStatus: asInteractor(CheckLoginStatusInteractor),
    loadUserPreferences: asInteractor(LoadUserPreferencesInteractor),
    logout: asInteractor(LogoutInteractor),
    showRegistration: asInteractor(ShowRegistrationInteractor),
    register: asInteractor(RegisterInteractor),
    showUserProfile: asInteractor(ShowUserProfileInteractor),
    updateUserProfile: asInteractor(UpdateUserProfileInteractor),
    getUserProfile: asInteractor(GetUserProfileInteractor),
    showTeam: asInteractor(ShowTeamInteractor),
    createTeam: asInteractor(CreateTeamInteractor),
    inviteUserToTeam: asInteractor(InviteUserToTeamInteractor),
    respondToPendingInvite: asInteractor(RespondToPendingInviteInteractor),
    getTeamInvitesForUser: asInteractor(GetTeamInvitesForUserInteractor),
    updateTeamDetails: asInteractor(UpdateTeamDetailsInteractor),
    showIteration: asInteractor(ShowIterationInteractor),
    showProject: asInteractor(ShowProjectInteractor),
    createProject: asInteractor(CreateProjectInteractor),
    updateProjectDetails: asInteractor(UpdateProjectDetailsInteractor),
    createIteration: asInteractor(CreateIterationInteractor),
    getActiveIterationForProject: asInteractor(
      GetActiveIterationForProjectInteractor
    ),
    getUserListByEmail: asInteractor(GetUserListByEmailInteractor),
    getAllUsers: asInteractor(GetAllUsersInteractor)
  });

  return {
    resolve<T>(name: string) {
      return _container.resolve(name) as T;
    },
    registerValue(name: string, dependency: any) {
      _container.register(name, asValue(dependency));
    },
    createScope() {
      return _container.createScope();
    }
  } as IModuleContainer;
};

export default ModuleContainer;
