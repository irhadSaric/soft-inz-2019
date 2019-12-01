import React from "react";
export interface Props {
  router: any;
  children?: any;
}
export interface State {}

export default class RootLayout extends React.Component<Props, State> {
  render() {
    const { children } = this.props;
    return <div className="root_layout">{children}</div>;
  }
}
