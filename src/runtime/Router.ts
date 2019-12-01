import { createBrowserHistory, LocationDescriptorObject } from "history";
import * as React from "react";
import ReactDOM from "react-dom";
import toRegex from "path-to-regexp";
import Application from "../Application";
import { Layouts } from "../common/Constants";
import AppLayout from "../ui/layouts/AppLayout";
import RootLayout from "../ui/layouts/RootLayout";
import BaseLayout from "../ui/layouts/BaseLayout";
import { ITranslationService } from "../service/locale/TranslationService";
import { INotificationService } from "../service/notification/NotificationService";
import CheckLoginStatusInteractor from "../interactor/authentication/CheckLoginStatusInteractor";
import LoadUserPreferencesInteractor from "../interactor/authentication/LoadUserPreferencesInteractor";

export interface TRouteOptions {
  secure?: boolean;
  role?: string[];
  name?: string;
  layout?: string;
  initialProps?: any;
}
export interface TRoute {
  path: string;
  page: any;

  options?: TRouteOptions;
}

export interface IRouter {
  registerRoutes(...routes: TRoute[]): void;
  showLocation(location?: Location | string): Promise<any>;
  replace(location: LocationDescriptorObject): void;
  push(location: LocationDescriptorObject): void;
  bindLocationListener(): void;
  goBack(): void;
  location: TRoute;
}
const Router = (context, rootElement, application: Application, routes) => {
  let _history = createBrowserHistory({
    basename: context
  });
  let _routes = routes;
  let _location: TRoute;
  let _rootElement = rootElement;
  let _application = application;
  let _notificationService: INotificationService = _application.container.resolve<
    INotificationService
  >("notificationService");

  function registerRoutes(...routes: TRoute[]) {
    _routes = [..._routes, ...routes];
  }

  function matchURI(path, uri, search = "", hash = "") {
    const keys = [];
    const pattern = toRegex(path, keys);
    const match = pattern.exec(uri);
    if (!match) return null;
    let params = Object.create(null);
    for (let i = 1; i < match.length; i++) {
      params[(keys[i - 1] as any).name] =
        match[i] !== undefined ? match[i] : undefined;
    }
    if (search) {
      const urlParams = new URLSearchParams(search);
      for (var entry of urlParams.entries()) {
        params[entry[0]] = entry[1];
      }
    }
    return params;
  }

  function buildPage(route: TRoute, props) {
    let _layoutType =
      (route.options && route.options.layout) || Layouts.DEFAULT;
    let layout: any;
    switch (_layoutType) {
      case Layouts.APP:
        layout = AppLayout;
        break;
      case Layouts.ROOT:
        layout = RootLayout;
        break;
      case Layouts.BASE:
        layout = BaseLayout;
        break;
      default:
        layout = AppLayout;
    }
    let pageProps = {
      ...props,
      ...{
        store: _application.store,
        router: _router,
        translate: _application.container.resolve<ITranslationService>(
          "translationService"
        ).get
      }
    };
    let page = React.createElement(
      layout,
      pageProps,
      React.createElement(route.page, pageProps)
    );
    return page;
  }

  async function resolve(routes, context) {
    for (const route of routes as TRoute[]) {
      if (context.error) {
        console.error(context.error);
      }
      const uri = context.error ? "/error" : context.pathname;
      const params = matchURI(route.path, uri, context.search, context.hash);
      if (!params) continue;
      _location = route;

      if (route.options && route.options.secure) {
        const isLoggedIn = await _application.container
          .resolve<CheckLoginStatusInteractor>("checkLoginStatus")
          .execute();
        if (!isLoggedIn) {
          return replace({
            ...context,
            pathname: "/login"
          });
        } else {
          await _application.container
            .resolve<LoadUserPreferencesInteractor>("loadUserPreferences")
            .execute();
        }
      }

      let node = _rootElement;
      let props = Object.assign(
        {},
        route.options || {},
        (route.options && route.options.initialProps) || {},
        {
          params
        }
      ) as any;
      let page = buildPage(route, props);
      return ReactDOM.render(page, node);
    }
    const error = new Error(
      'Route "' + context.pathname + '" not found'
    ) as any;
    error.status = 404;
    throw error;
  }

  function push(location = {}) {
    return _history.push(location);
  }

  function goBack() {
    return _history.goBack();
  }

  function replace(location: LocationDescriptorObject) {
    return _history.replace(location);
  }

  async function showLocation(
    location: LocationDescriptorObject | string = _history.location
  ) {
    try {
      let _location: LocationDescriptorObject | string = location;
      if (typeof location === "string") {
        _location = {
          pathname: location
        };
      }
      await resolve(_routes, _location);
      return;
    } catch (error) {
      if (error.status) {
        switch (error.status) {
          case 401:
            _notificationService.showError(error.message);
            return replace({
              pathname: "/login"
            });
          case 404:
            return replace({
              pathname: "/error"
            });
          default:
            return;
        }
      }
    }
  }

  function registerLocationListener() {
    _history.listen(showLocation);
  }

  var _router = {
    registerRoutes,
    showLocation,
    replace,
    push,
    bindLocationListener: registerLocationListener,
    goBack,
    get location() {
      return _location;
    }
  } as IRouter;

  return _router;
};

export { Router };
