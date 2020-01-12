import React from "react";
import Page, { PageProps } from "../Page";
import { IHomePresenter } from "../../../presenter/main/HomePresenter";
import ShowTeamInvitesList from "../team/ShowTeamInvitesList";

export interface Props extends PageProps {}
export interface State extends IHomePresenter {}

export default class TeamInvitesPage extends React.Component<Props, State> {
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
    const { teamInvitesForUser, respondToPendingInvite } = this.state;
    return (
      <Page {...this.props} style={{ display: "flex" }}>
        <ShowTeamInvitesList
          teamInvitesForUser={teamInvitesForUser}
          respondToPendingInvite={respondToPendingInvite}
        />
      </Page>
    );
  }
}
