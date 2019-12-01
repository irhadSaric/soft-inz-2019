import * as React from "react";
import { Input, Icon, Button } from "antd";
import Text from "antd/lib/typography/Text";

const LoginForm = ({
  translate,
  email,
  password,
  loginButtonDisabled,
  login,
  onChangeEmail,
  onChangePassword,
  loading,
  showRegistration
}: {
  translate: any;
  email?: string;
  password?: string;
  loginButtonDisabled: boolean;
  login: any;
  onChangeEmail: any;
  onChangePassword: any;
  loading: boolean;
  showRegistration: any;
}) => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-title-wrapper">
          <Text className="login-text ">Welcome to Pragma</Text>
        </div>

        <div className="login-form-item-container">
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={"Email"}
            value={email}
            onChange={e => onChangeEmail(e.target.value)}
            allowClear={true}
            style={{ marginTop: 35, marginLeft: 50, marginRight: 50 }}
          />
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={"Password"}
            value={password}
            onPressEnter={login}
            onChange={e => onChangePassword(e.target.value)}
            allowClear={true}
            style={{ marginTop: 20, marginLeft: 50, marginRight: 50 }}
          />
          <Button
            type="primary"
            disabled={loginButtonDisabled}
            onClick={login}
            className="login-button"
            loading={loading}
          >
            Log in
          </Button>
          <Button
            type={"link"}
            style={{ marginTop: 8 }}
            onClick={showRegistration}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
