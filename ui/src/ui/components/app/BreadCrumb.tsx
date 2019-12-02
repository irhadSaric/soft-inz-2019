import * as React from "react";
import { IRouter, TRoute } from "../../../runtime/Router";
import { TTranslate } from "../../../service/locale/TranslationService";
import Link from "./Link";

export interface State {}

export interface Props {
  router: IRouter;
  translate: TTranslate;
}

export default class Breadcrumb extends React.Component<Props, State> {
  handleClick(event) {
    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
  }

  buildBreadcrumbs(location: TRoute) {
    let crumbs = [
      "",
      ...(location.path || "").split("/").filter(item => item.length > 0)
    ];
    let _path = "";
    return crumbs.map((item, i) => {
      if (_path === "/") {
        _path = "";
      }
      const key = `pages.${item || "home"}`;
      _path = [_path, item].join("/");
      return {
        path: _path,
        name: this.props.translate(key) || `__${key}__`,
        disabled: i === crumbs.length - 1 ? true : false
      };
    });
  }

  render() {
    const { router } = this.props;
    const crumbs = this.buildBreadcrumbs(router.location);
    return (
      <div className="sa-page-ribbon">
        <h1>{crumbs[crumbs.length - 1].name}</h1>
        <ol className="breadcrumb" aria-label="breadcrumb" role="navigation">
          {(crumbs || []).map((crumb, index) => (
            <li key={`crumb-${index}`} className="breadcrumb-item">
              <Link router={router} path={crumb.path} disabled={crumb.disabled}>
                <span>{crumb.name}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
