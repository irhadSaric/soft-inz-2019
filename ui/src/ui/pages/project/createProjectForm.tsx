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
  onChangeProjectStatusValue,
  validationProjectErrors
}: {
  projectStatus: IStatus;
  projectEndDate: Moment;
  projectDescription: string;
  projectName: string;
  onChangeProjectNameValue(value: string): void;
  onChangeProjectDescriptionValue(value: string): void;
  onChangeProjectStatusValue(value: IStatus): void;
  onChangeProjectEndDateValue: any;
  validationProjectErrors: any;
}) => {
  const checkValidationErrors = (fieldName: string) => {
    return (
      validationProjectErrors && validationProjectErrors[fieldName].length > 0
    );
  };
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
        {checkValidationErrors("projectName") && (
          <Text className={"error-text"}>
            {validationProjectErrors["projectName"][0]}
          </Text>
        )}
      </div>
      <Input.TextArea
        placeholder={"Description"}
        value={projectDescription}
        onChange={e => onChangeProjectDescriptionValue(e.target.value)}
        autosize={{ minRows: 4 }}
        style={{ marginTop: 20 }}
      />
      {checkValidationErrors("projectDescription") && (
        <Text className={"error-text"}>
          {validationProjectErrors["projectDescription"][0]}
        </Text>
      )}
      <div>
        <DatePicker
          placeholder={"End Date"}
          format={"DD-MM-YYYY"}
          showToday={false}
          disabledDate={disabledDate}
          onChange={e => onChangeProjectEndDateValue(e)}
          style={{ marginTop: 20 }}
        />
      </div>
      {checkValidationErrors("projectEndDate") && (
        <Text className={"error-text"}>
          {validationProjectErrors["projectEndDate"][0]}
        </Text>
      )}
    </div>
  );
};

export default CreateProjectForm;
