import React from "react";
import RootLayout from "./RootLayout";

export interface Props {
  router: any;
  children?: any;
}
export interface State {}

export default class BaseLayout extends React.Component<Props, State> {
  render() {
    const { children } = this.props;

    return (
      <RootLayout {...this.props}>
        <div className="base_layout">{children}</div>
      </RootLayout>
    );
  }
}
