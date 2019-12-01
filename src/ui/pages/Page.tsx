import * as React from "react";
import { IRouter } from "../../runtime/Router";
import { TTranslate } from "../../service/locale/TranslationService";

export interface PageProps {
  router: IRouter;
  children?: any;
  translate: TTranslate;
  style?: any;
}

export interface PageState {}

export default class Page extends React.Component<PageProps, PageState> {
  render() {
    const { children, style } = this.props;
    return (
      <div
        className="page"
        style={style}
      >
        {children}
      </div>
    );
  }
}
