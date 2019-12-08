import * as React from "react";
import { Input, Select } from "antd";
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
  validationErrors
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
        //notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        //onSearch={this.fetchUser}
        onChange={e => onChangeSelectUserList(e)}
        style={{ width: "100%", marginTop: 20 }}
      >
        {users.map(user => (
          <Option key={user.id}>{user.email}</Option>
        ))}
      </Select>
    </div>
  );
};

export default CreateTeamForm;
