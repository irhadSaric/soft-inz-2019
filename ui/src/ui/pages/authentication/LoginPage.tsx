import React from "react";
import Page, { PageProps } from "../Page";
import { ILoginPresenter } from "../../../presenter/authentication/LoginPresenter";
import LoginForm from "./LoginForm";

export interface Props extends PageProps {}
export interface State extends ILoginPresenter {}

export default class LoginPage extends React.Component<Props, State> {
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
      login,
      email,
      password,
      loginButtonDisabled,
      setEmail,
      setPassword,
      showRegistrationPage
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
        <LoginForm
          translate={translate}
          email={email}
          password={password}
          login={login}
          loginButtonDisabled={loginButtonDisabled}
          onChangePassword={setPassword}
          onChangeEmail={setEmail}
          loading={this.state.loaders.loginLoader}
          showRegistration={showRegistrationPage}
        />
      </Page>
    );
  }
}
