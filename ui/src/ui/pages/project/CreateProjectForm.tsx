import * as React from "react";
import { Input, Select, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import moment, { Moment } from "moment";
import { IProject } from "../../../model/project/Project";

const { Option } = Select;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const CreateProjectForm = ({
  project,
  onChangeProjectData,
  validationProjectErrors
}: {
  onChangeProjectData(key: string, value: any): void;
  project: IProject;
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
          value={project.name}
          onChange={e => onChangeProjectData("name", e.target.value)}
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
        value={project.description}
        onChange={e => onChangeProjectData("description", e.target.value)}
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
          onChange={e => onChangeProjectData("endDate", e)}
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
