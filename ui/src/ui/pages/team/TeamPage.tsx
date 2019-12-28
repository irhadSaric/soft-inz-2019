import React from "react";
import Page, { PageProps } from "../Page";
import { ITeamPresenter } from "../../../presenter/team/TeamPresenter";
import TeamForm from "./TeamForm";

export interface Props extends PageProps {}
export interface State extends ITeamPresenter {}

export default class TeamPage extends React.Component<Props, State> {
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
      teamDetails,
      translate,
      isEditableForm,
      onEditBtnClick,
      onCancelBtnClick,
      editButtonDisabled,
      editValidationErrors,
      updateTeamDetails,
      onChangeTeamData
    } = this.state;
    return (
      <Page
        {...this.props}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <TeamForm
          teamDetails={teamDetails}
          translate={translate}
          isEditable={isEditableForm}
          onEditBtnClick={onEditBtnClick}
          onCancelBtnClick={onCancelBtnClick}
          editButtonDisabled={editButtonDisabled}
          validationErrors={editValidationErrors}
          updateTeamDetails={updateTeamDetails}
          onChangeTeamData={onChangeTeamData}
        />
      </Page>
    );
  }
}
