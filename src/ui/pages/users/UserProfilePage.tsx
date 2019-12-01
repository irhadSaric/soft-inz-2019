import React from "react";
import Page, { PageProps } from "../Page";
import { Input, Select, Avatar, Divider, Button } from "antd";
import { IUserProfilePresenter } from "../../../presenter/user/UserProfilePresenter";
import Text from "antd/lib/typography/Text";
import UserProfileForm from "./UserProfileForm";

export interface Props extends PageProps {}
export interface State extends IUserProfilePresenter {}

export default class UserProfilePage extends React.Component<Props, State> {
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
      userProfile,
      countries,
      translate,
      isEditableForm,
      onEditBtnClick,
      onCancelBtnClick,
      editButtonDisabled,
      onChangeUserData,
      updateUserProfile,
      editValidationErrors
    } = this.state;
    return (
      <Page
        {...this.props}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <UserProfileForm
          userProfile={userProfile}
          countries={countries}
          translate={translate}
          isEditable={isEditableForm}
          onEditBtnClick={onEditBtnClick}
          onCancelBtnClick={onCancelBtnClick}
          editButtonDisabled={editButtonDisabled}
          onChangeUserData={onChangeUserData}
          isLoading={this.state.loaders.editUserLoader}
          updateUserProfile={updateUserProfile}
          validationErrors={editValidationErrors}
        />
      </Page>
    );
  }
}
