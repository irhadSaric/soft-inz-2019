import * as React from "react";
import { ICountry } from "../../../model/country/Country";
import { Avatar, Button, Divider, Input, Select, Form } from "antd";
import { IUser } from "../../../model/user/User";
import Text from "antd/lib/typography/Text";

const TeamForm = ({
  translate,
  userProfile,
  countries,
  isEditable,
  onEditBtnClick,
  onCancelBtnClick,
  editButtonDisabled,
  onChangeUserData,
  isLoading,
  updateUserProfile,
  validationErrors,
  projectDescription,
  onChangeProjectDescription,
}: {
  translate: any;
  userProfile: IUser;
  countries: ICountry[];
  isEditable: boolean;
  onEditBtnClick: any;
  onCancelBtnClick: any;
  editButtonDisabled: boolean;
  onChangeUserData(key: string, value: any): void;
  isLoading: boolean;
  updateUserProfile: any;
  validationErrors: any;
  projectDescription: string;
  onChangeProjectDescription(value: string): void;
}) => {
  const checkValidationErrors = (fieldName: string) => {
    return validationErrors && validationErrors[fieldName].length > 0;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 40,
        background: "#f0f0f0",
        borderRadius: 10,
        width: 780
      }}
    >
      <div style={{ width: 200, display: "flex", flexDirection: "column" }}>
        <Avatar style={{ marginLeft: 20 }} size={150} icon="user" />
      </div>
      <Divider
        style={{ height: "auto", background: "#cccccc" }}
        type={"vertical"}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Form>
          <Form.Item
            validateStatus={
              checkValidationErrors("firstName") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
              <Input
                addonBefore={<Text>Team Name</Text>}
                placeholder={"Team Name"}
                value={userProfile.firstName}
                onChange={e => onChangeUserData("firstName", e.target.value)}
                allowClear={true}
                style={{ marginTop: 20, width: 400 }}
                readOnly={!isEditable}
              />
              {checkValidationErrors("firstName") && (
                <Text className={"error-text"}>
                  {validationErrors["firstName"][0]}
                </Text>
              )}
            </div>
          </Form.Item>
          <Form.Item
            validateStatus={
              checkValidationErrors("lastName") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
            <Input.TextArea
              placeholder={"Description"}
              value={projectDescription}
              onChange={e => onChangeProjectDescription(e.target.value)}
              autosize={{ minRows: 4 }}
              style={{ marginTop: 20 }}
            />
            </div>
          </Form.Item>

          <Form.Item
            validateStatus={
              checkValidationErrors("email") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
              <Input
                addonBefore={<Text>Email</Text>}
                placeholder={"Email"}
                value={userProfile.email}
                onChange={e => onChangeUserData("email", e.target.value)}
                allowClear={true}
                style={{ marginTop: 20, width: 400 }}
                readOnly={!isEditable}
              />
              {checkValidationErrors("email") && (
                <Text className={"error-text"}>
                  {validationErrors["email"][0]}
                </Text>
              )}
            </div>
          </Form.Item>

          <Form.Item
            validateStatus={
              checkValidationErrors("phone") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
              <Input
                addonBefore={<Text>Phone</Text>}
                placeholder={"Phone"}
                value={userProfile.phone}
                onChange={e => onChangeUserData("phone", e.target.value)}
                allowClear={true}
                style={{ marginTop: 20, width: 400 }}
                readOnly={!isEditable}
              />
              {checkValidationErrors("phone") && (
                <Text className={"error-text"}>
                  {validationErrors["phone"][0]}
                </Text>
              )}
            </div>
          </Form.Item>

          {!isEditable ? (
            <Input
              addonBefore={<Text>Country</Text>}
              placeholder={"Country"}
              value={userProfile.country && userProfile.country.name}
              allowClear={true}
              style={{ marginTop: 20, width: 400 }}
              readOnly={!isEditable}
            />
          ) : (
            <Form.Item
              validateStatus={
                checkValidationErrors("country") ? "error" : undefined
              }
            >
              <div className={"form-item"}>
                <Select
                  placeholder={"Select Country"}
                  allowClear
                  showSearch={true}
                  style={{ marginTop: 20, width: 400 }}
                  onChange={e => onChangeUserData("country", e)}
                  value={userProfile.country && userProfile.country.name}
                >
                  {countries.map(item => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                {checkValidationErrors("country") && (
                  <Text className={"error-text"}>
                    {validationErrors["country"][0]}
                  </Text>
                )}
              </div>
            </Form.Item>
          )}
        </Form>

        {isEditable && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-end",
              marginTop: 20
            }}
          >
            <Button type={"link"} onClick={onCancelBtnClick}>
              Cancel
            </Button>
            <Button
              type={"primary"}
              loading={isLoading}
              disabled={editButtonDisabled}
              onClick={updateUserProfile}
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div style={{ marginTop: -15, marginLeft: 30 }}>
        <Button
          type="primary"
          shape={"circle"}
          icon="edit"
          onClick={onEditBtnClick}
          disabled={isEditable}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default TeamForm;
