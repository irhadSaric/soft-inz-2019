import moment from "moment";
import "moment/locale/bs";
import IModuleContainer from "./runtime/IModuleContainer";
import ModuleContainer from "./runtime/ModuleContainer";
import { ILocaleProvider } from "./service/locale/LocaleProvider";
import { IStore } from "./model/runtime/state/Store";
import { IRouter, Router } from "./runtime/Router";
import { IArea } from "./areas/Area";
import { HttpConstants } from "./common/Constants";

export default class Application {
  private _router: IRouter;
  private _container: IModuleContainer;
  private _localeProvider: ILocaleProvider;

  private _areas = [
    "home",
    "user",
    "authentication",
    "team",
    "project",
    "ticket"
  ];

  get container() {
    return this._container;
  }

  get navigator() {
    return this._router;
  }

  get localeProvider() {
    return this._localeProvider;
  }
  constructor(context: any, rootElement: HTMLElement) {
    this._container = ModuleContainer(this);
    this._router = Router(context, rootElement, this, []);
    this._container.registerValue("router", this._router);
    this._localeProvider = this.container.resolve<ILocaleProvider>(
      "localeProvider"
    );

    moment.locale(this._localeProvider.getCurrentLanguage());
    window["__secretApplication"] = this;
  }

  private async handleNetworkError(error: any) {
    if (error.status != null) {
      if (error.code === HttpConstants.HTTP_CLIENT_ERROR_CODE) {
        if (error.status === 401) {
        }
        if (error.status === 403) {
          throw error;
        }
      } else {
        //TODO handle 5xx errors
        throw error;
        //TODO log to crashlytics
      }
      return;
    }
    throw error;
  }

  private registerGlobalErrorHandler() {
    window.addEventListener("unhandledrejection", function(e) {
      var reason = e.reason ? e.reason : e.type;

      if (window["Raven"]) {
        e.preventDefault();
        window["Raven"].captureException(new Error(reason));
      }
    });
  }
  public changeSystemLanguage(languageCode: string) {
    this._container.registerValue("language", languageCode);
  }

  private registerAreas(areas: string[]) {
    areas.forEach(area => {
      this._container.resolve<IArea>(`${area}Area`).register();
    });
  }

  public async onApplicationError(error: any) {
    try {
      await this.handleNetworkError(error);
    } catch (error) {
      throw error;
    }
  }

  async start() {
    this.registerAreas(this._areas);
    this._router.bindLocationListener();
    this._router.showLocation();

    this.registerGlobalErrorHandler();
  }

  public get store() {
    return this._container.resolve<IStore>("store");
  }

  addLocale(locale: string, translations = {}) {
    if (locale) {
      this.localeProvider.addLocale(locale, translations);
    }
  }
}
