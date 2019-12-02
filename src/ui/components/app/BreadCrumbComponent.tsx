import * as React from "react";
import { IRouter, TRoute } from "../../../runtime/Router";
import { TTranslate } from "../../../service/locale/TranslationService";
import Link from "./Link";
import { Breadcrumb, Icon } from "antd";

export interface State {}

export interface Props {
  router: IRouter;
  translate: TTranslate;
}

export default class BreadCrumbComponent extends React.Component<Props, State> {
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
        <Breadcrumb>
          {(crumbs || []).map((crumb, index) =>
            crumbs.length - 1 === index ? (
              <Breadcrumb.Item key={index}>{crumb.name}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index} href={crumb.path}>
                {crumb.name}
              </Breadcrumb.Item>
            )
          )}
        </Breadcrumb>
      </div>
    );
  }
}
