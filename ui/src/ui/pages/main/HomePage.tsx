import React from "react";
import { Button, Icon } from "antd";
import Page, { PageProps } from "../Page";
import { IHomePresenter } from "../../../presenter/main/HomePresenter";
export interface Props extends PageProps {}
export interface State extends IHomePresenter {}

export default class HomePage extends React.Component<Props, State> {
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
    return (
      <Page {...this.props}>
        <h2>Home Page</h2>
        <Button type="primary">
          Forward
          <Icon type="right" />
        </Button>
      </Page>
    );
  }
}
