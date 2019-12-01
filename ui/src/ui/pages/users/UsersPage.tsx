import React from "react";
import Page, { PageProps } from "../Page";
import { IUserPresenter } from "../../../presenter/user/UserPresenter";

export interface Props extends PageProps {}
export interface State extends IUserPresenter {}

export default class UsersPage extends React.Component<Props, State> {
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
    const { users } = this.state;
    return (
      <Page {...this.props}>
        <h2>Users</h2>
        {/* Show list users */}
      </Page>
    );
  }
}
