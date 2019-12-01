import React from "react";
import Page, { PageProps } from "../Page";
import Text from "antd/lib/typography/Text";
import { ILoginPresenter } from "../../../presenter/authentication/LoginPresenter";

export interface Props extends PageProps {}
export interface State extends ILoginPresenter {}

export default class LogoutPage extends React.Component<Props, State> {
  private subscriptionId: number = 0;

  constructor(props: any) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    this.subscriptionId = this.state.store.subscribe(result => {
      return this.setState(prevState => result);
    });
  }

  componentWillUnmount() {
    this.state.store.unsubscribe(this.subscriptionId);
  }

  render() {
    let { translate } = this.state;
    return (
      <Page
        {...this.props}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%"
        }}
      >
        <Text style={{ fontSize: 30, color: "#8D8D8D", fontWeight: "bold" }}>
          Logging out...
        </Text>
      </Page>
    );
  }
}
