import React from "react";
import ActiveTeamListComponent from "./ActiveTeamListComponent";
import { Button, Modal, Avatar, Divider } from "antd";
import Page, { PageProps } from "../Page";
import { IHomePresenter } from "../../../presenter/main/HomePresenter";
import CreateTeamForm from "../team/CreateTeamForm";
import ShowTeamInvitesList from "../team/ShowTeamInvitesList";

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
    const {
      isCreateTeamModalVisible,
      onCreateTeamBtnClick,
      onCancelTeamModalButtonClick,
      translate,
      userList,
      selectedUsers,
      onChangeSelectUserList,
      onChangeProjectDescriptionValue,
      onChangeTeamNameValue,
      teamName,
      projectDescription,
      createTeam,
      createTeamValidationErrors,
      teamInvitesForUser,
      respondToPendingInvite,
      activeTeamList,
      showTeamPage,
      onChangeSelectSearch,
      onDropdownVisibleChange
    } = this.state;
    return (
      <Page {...this.props} style={{ display: "flex" }}>
        <div>
          <Button type="primary" onClick={onCreateTeamBtnClick}>
            Create team
          </Button>
          <Modal
            title="Create team"
            visible={isCreateTeamModalVisible}
            onOk={createTeam}
            onCancel={onCancelTeamModalButtonClick}
            maskClosable={false}
            okButtonProps={{ loading: this.state.loaders.createTeamLoader }}
          >
            <Avatar style={{ marginLeft: 50 }} size={150} icon="team" />
            <Button style={{ marginLeft: 30 }} type={"link"}>
              Upload photo
            </Button>
            <CreateTeamForm
              translate={translate}
              users={userList}
              selectedUsers={selectedUsers}
              onChangeSelectUserList={onChangeSelectUserList}
              onChangeProjectDescription={onChangeProjectDescriptionValue}
              onChangeTeamName={onChangeTeamNameValue}
              teamName={teamName}
              projectDescription={projectDescription}
              validationErrors={createTeamValidationErrors}
              onChangeSelectSearch={onChangeSelectSearch}
              userListLoading={this.state.loaders.userListLoader}
              onDropdownVisibleChange={onDropdownVisibleChange}
            />
          </Modal>
        </div>
        <Divider
          style={{ height: "auto", background: "#cccccc" }}
          type={"vertical"}
        />
        <ShowTeamInvitesList
          teamInvitesForUser={teamInvitesForUser}
          respondToPendingInvite={respondToPendingInvite}
        />
        <Divider
          style={{ height: "auto", background: "#cccccc" }}
          type={"vertical"}
        />
        <ActiveTeamListComponent
          translate={translate}
          activeTeamList={activeTeamList}
          showTeamPage={showTeamPage}
        />
      </Page>
    );
  }
}
