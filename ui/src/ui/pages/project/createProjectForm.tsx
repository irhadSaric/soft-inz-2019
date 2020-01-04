import * as React from "react";
import { Input, Select, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import { IUser } from "../../../model/user/User";
import { TSelectValuePresentationModel } from "../../../presenter/main/HomePresenter";
import { IStatus } from "../../../model/status/Status";
import moment, { Moment } from "moment";

const { Option } = Select;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const CreateProjectForm = ({
  projectStatus,
  projectName,
  projectDescription,
  projectEndDate,
  onChangeProjectNameValue,
  onChangeProjectDescriptionValue,
  onChangeProjectEndDateValue,
  onChangeProjectStatusValue
}: {
  projectStatus: IStatus;
  projectEndDate: Moment;
  projectDescription: string;
  projectName: string;
  onChangeProjectNameValue(value: string): void;
  onChangeProjectDescriptionValue(value: string): void;
  onChangeProjectStatusValue(value: IStatus): void;
  // onChangeProjectEndDateValue(value: Moment): void;
  onChangeProjectEndDateValue: any;
}) => {
  return (
    <div>
      <div>
        <Input
          addonBefore={<Text>Project name</Text>}
          placeholder={"Project Name"}
          value={projectName}
          onChange={e => onChangeProjectNameValue(e.target.value)}
          allowClear={true}
          style={{ marginTop: 20 }}
        />
        {/* {checkValidationErrors("teamName") && (
          <Text className={"error-text"}>
            {validationErrors["teamName"][0]}
          </Text>
        )} */}
      </div>
      <Input.TextArea
        placeholder={"Description"}
        value={projectDescription}
        onChange={e => onChangeProjectDescriptionValue(e.target.value)}
        autosize={{ minRows: 4 }}
        style={{ marginTop: 20 }}
      />
      {/* {checkValidationErrors("projectDescription") && (
        <Text className={"error-text"}>
          {validationErrors["projectDescription"][0]}
        </Text>
      )} */}
      <DatePicker
        placeholder={"End Date"}
        format={"DD-MM-YYYY"}
        showToday={false}
        disabledDate={disabledDate}
        //value={projectEndDate}
        onChange={e => onChangeProjectEndDateValue(e)}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default CreateProjectForm;
