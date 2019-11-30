import * as React from "react";
import { Input, Icon, Button, Select } from "antd";
import { TRegisterPresentationModel } from "../../../presenter/authentication/RegistrationPresenter";
import { ICountry } from "../../../model/country/Country";
import Text from "antd/lib/typography/Text";

const RegistrationForm = ({
  translate,
  registrationData,
  onChangeRegistrationData,
  countries,
  showLogin,
  loading,
  register,
  registerButtonDisabled,
  validationErrors
}: {
  translate: any;
  registrationData: TRegisterPresentationModel;
  countries: ICountry[];
  onChangeRegistrationData(key: string, value: any): void;
  showLogin: any;
  loading: boolean;
  register: any;
  registerButtonDisabled: boolean;
  validationErrors: any;
}) => {
  const checkValidationErrors = (fieldName: string) => {
    return validationErrors && validationErrors[fieldName];
  };
  return (
    <div className="register-container">
      <div className="register-title-wrapper">
        <Text className="login-text ">Registration</Text>
      </div>
      <div className={"form-item"}>
        <Input
          placeholder={"First Name"}
          value={registrationData.firstName}
          onChange={e => onChangeRegistrationData("firstName", e.target.value)}
          allowClear={true}
          style={{ marginTop: 20, width: 400 }}
        />
        {checkValidationErrors("firstName") && (
          <Text className={"error-text"}>
            {validationErrors["firstName"][0]}
          </Text>
        )}
      </div>

      <div className={"form-item"}>
        <Input
          placeholder={"Last Name"}
          value={registrationData.lastName}
          onChange={e => onChangeRegistrationData("lastName", e.target.value)}
          allowClear={true}
          style={{ marginTop: 20, width: 400 }}
        />
        {checkValidationErrors("lastName") && (
          <Text className={"error-text"}>
            {validationErrors["lastName"][0]}
          </Text>
        )}
      </div>

      <div className={"form-item"}>
        <Input
          placeholder={"Email"}
          value={registrationData.email}
          onChange={e => onChangeRegistrationData("email", e.target.value)}
          allowClear={true}
          style={{ marginTop: 20, width: 400 }}
        />
        {checkValidationErrors("email") && (
          <Text className={"error-text"}>{validationErrors["email"][0]}</Text>
        )}
      </div>

      <div className={"form-item"}>
        <Input.Password
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder={"Password"}
          value={registrationData.password}
          onChange={e => onChangeRegistrationData("password", e.target.value)}
          allowClear={true}
          style={{ marginTop: 20, width: 400 }}
        />
        {checkValidationErrors("password") && (
          <Text className={"error-text"}>
            {validationErrors["password"][0]}
          </Text>
        )}
      </div>

      <div className={"form-item"}>
        <Input
          placeholder={"Phone"}
          value={registrationData.phone}
          onChange={e => onChangeRegistrationData("phone", e.target.value)}
          allowClear={true}
          style={{ marginTop: 20, width: 400 }}
        />
        {checkValidationErrors("phone") && (
          <Text className={"error-text"}>{validationErrors["phone"][0]}</Text>
        )}
      </div>

      <div className={"form-item"}>
        <Select
          placeholder={"Select Country"}
          allowClear
          showSearch={true}
          style={{ marginTop: 20, width: 400 }}
          onChange={e => onChangeRegistrationData("country", e)}
        >
          {countries.map(item => (
            <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
          ))}
        </Select>
        {checkValidationErrors("country") && (
          <Text className={"error-text"}>{validationErrors["country"][0]}</Text>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button type="link" onClick={showLogin} className="register-button">
          Cancel
        </Button>
        <Button
          type="primary"
          disabled={registerButtonDisabled}
          onClick={register}
          className="register-button"
          loading={loading}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
