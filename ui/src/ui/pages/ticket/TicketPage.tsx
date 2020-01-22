import React from "react";
import Page, { PageProps } from "../Page";
import { ITicketPresenter } from "../../../presenter/ticket/TicketPresenter";
import TicketForm from "./TicketForm";

export interface Props extends PageProps { }
export interface State extends ITicketPresenter { }

export default class TicketPage extends React.Component<Props, State> {
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
      translate,
      isEditableForm,
      onCancelBtnClick,
      editValidationErrors,
      ticket,
      ticketDetails,
      onChangeTicketData,
      userList,
      assignUserToTask,
      onChangeSelectUserList,
      selectedUsers,
      onChangeSelectSearch,
      onDropdownVisibleChange,
      onEditBtnClick,
      updateTicketDetails,
      editButtonDisabled
    } = this.state;
    return (
      <Page
        {...this.props}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <TicketForm
          translate={translate}
          isEditable={isEditableForm}
          onCancelBtnClick={onCancelBtnClick}
          validationErrors={editValidationErrors}
          isLoading={this.state.loaders.editTeamLoader}
          ticket={ticket}
          ticketDetails={ticketDetails}
          onChangeTicketData={onChangeTicketData}
          users={userList}
          assignUserToTask={assignUserToTask}
          onChangeSelectUserList={onChangeSelectUserList}
          selectedUsers={selectedUsers}
          onChangeSelectSearch={onChangeSelectSearch}
          userListLoading={this.state.loaders.userListLoader}
          onDropdownVisibleChange={onDropdownVisibleChange}
          onEditBtnClick={onEditBtnClick}
          updateTicketDetails={updateTicketDetails}
          editButtonDisabled={editButtonDisabled}
        />
      </Page>
    );
  }
}
