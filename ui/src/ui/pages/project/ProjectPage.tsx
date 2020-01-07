import React from "react";
import Page, { PageProps } from "../Page";
import ProjectForm from "./ProjectForm";
import { IProjectPresenter } from "../../../presenter/project/ProjectPresenter";

export interface Props extends PageProps {}
export interface State extends IProjectPresenter {}

export default class ProjectPage extends React.Component<Props, State> {
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
      project,
      isEditableForm,
      onEditBtnClick,
      onCancelBtnClick,
      editButtonDisabled,
      editValidationErrors,
      onChangeProjectData,
      updateProjectDetails
    } = this.state;
    return (
      <Page
        {...this.props}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <ProjectForm
          project={project}
          translate={translate}
          isEditable={isEditableForm}
          onEditBtnClick={onEditBtnClick}
          onCancelBtnClick={onCancelBtnClick}
          editButtonDisabled={editButtonDisabled}
          validationErrors={editValidationErrors}
          onChangeProjectData={onChangeProjectData}
          updateProjectDetails={updateProjectDetails}
        />
      </Page>
    );
  }
}
