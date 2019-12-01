import React from "react";

export interface IArea {
  register(params?: any): void;
}

export default class Area {
  protected createPage({ action, Page, ...params }) {
    return props => {
      let args = props.params;
      const output = action(args);
      return React.createElement(Page, Object.assign({}, output, props), {});
    };
  }
}
