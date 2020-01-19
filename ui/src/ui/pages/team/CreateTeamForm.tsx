import * as React from "react";
import { Input, Select, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import { IUser } from "../../../model/user/User";
import { TSelectValuePresentationModel } from "../../../presenter/main/HomePresenter";

const { Option } = Select;

const CreateTeamForm = ({
  translate,
  users,
  selectedUsers,
  onChangeSelectUserList,
  onChangeTeamName,
  onChangeProjectDescription,
  teamName,
  projectDescription,
  validationErrors,
  onChangeSelectSearch,
  userListLoading,
  onDropdownVisibleChange
}: {
  translate: any;
  users: IUser[];
  selectedUsers: TSelectValuePresentationModel[];
  onChangeSelectUserList: any;
  onChangeTeamName(value: string): void;
  onChangeProjectDescription(value: string): void;
  teamName: string;
  projectDescription: string;
  validationErrors: any;
  onChangeSelectSearch(value: string): void;
  userListLoading?: boolean;
  onDropdownVisibleChange(value: boolean): void;
}) => {
  const checkValidationErrors = (fieldName: string) => {
    return validationErrors && validationErrors[fieldName].length > 0;
  };
  return (
    <div>
      <div>
        <Input
          addonBefore={<Text>Team name</Text>}
          placeholder={"Team Name"}
          value={teamName}
          onChange={e => onChangeTeamName(e.target.value)}
          allowClear={true}
          style={{ marginTop: 20 }}
        />
        {checkValidationErrors("teamName") && (
          <Text className={"error-text"}>
            {validationErrors["teamName"][0]}
          </Text>
        )}
      </div>
      <Input.TextArea
        placeholder={"Description"}
        value={projectDescription}
        onChange={e => onChangeProjectDescription(e.target.value)}
        autosize={{ minRows: 4 }}
        style={{ marginTop: 20 }}
      />
      {checkValidationErrors("projectDescription") && (
        <Text className={"error-text"}>
          {validationErrors["projectDescription"][0]}
        </Text>
      )}
      <Select
        mode="multiple"
        labelInValue
        value={selectedUsers}
        placeholder="Select users"
        filterOption={false}
        notFoundContent={
          userListLoading ? (
            <Spin
              size="small"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
              tip={"Please wait..."}
            />
          ) : null
        }
        onSearch={e => onChangeSelectSearch(e)}
        onChange={e => onChangeSelectUserList(e)}
        style={{ width: "100%", marginTop: 20 }}
        loading={userListLoading}
        autoClearSearchValue={true}
        onDropdownVisibleChange={e => onDropdownVisibleChange(e)}
      >
        {users.map(user => (
          <Option key={user.id}>{user.email}</Option>
        ))}
      </Select>
    </div>
  );
};

export default CreateTeamForm;
