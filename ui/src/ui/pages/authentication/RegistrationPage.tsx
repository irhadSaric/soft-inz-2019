import React from "react";
import Page, { PageProps } from "../Page";
import { IRegistrationPresenter } from "../../../presenter/authentication/RegistrationPresenter";
import RegistrationForm from "./RegistrationForm";

export interface Props extends PageProps {}
export interface State extends IRegistrationPresenter {}

export default class RegistrationPage extends React.Component<Props, State> {
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

  componentWillMount() {
    this.state.store.unsubscribe(this.subscriptionId);
  }

  render() {
    let {
      translate,
      registrationData,
      onChangeRegistrationData,
      countries,
      showLoginPage,
      register,
      registerButtonDisabled,
      registerValidationErrors
    } = this.state;

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
        <RegistrationForm
          translate={translate}
          registrationData={registrationData}
          onChangeRegistrationData={onChangeRegistrationData}
          countries={countries}
          showLogin={showLoginPage}
          loading={this.state.loaders.registerLoader}
          register={register}
          registerButtonDisabled={registerButtonDisabled}
          validationErrors={registerValidationErrors}
        />
      </Page>
    );
  }
}
