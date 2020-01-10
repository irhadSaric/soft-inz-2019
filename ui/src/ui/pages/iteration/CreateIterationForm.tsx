import * as React from "react";
import { Input, Select, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import { IStatus } from "../../../model/status/Status";
import moment, { Moment } from "moment";
import { IProject } from "../../../model/project/Project";
import { IIteration } from "../../../model/iteration/iteration";

const { Option } = Select;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const CreateIterationForm = ({
  iteration,
  onChangeIterationData,
  createIterationValidationErrors
}: {
  onChangeIterationData(key: string, value: any): void;
  iteration: IIteration;
  createIterationValidationErrors: any;
}) => {
  const checkValidationErrors = (fieldName: string) => {
    return (
      createIterationValidationErrors &&
      createIterationValidationErrors[fieldName].length > 0
    );
  };
  return (
    <div>
      <div>
        <Input
          addonBefore={<Text>Iteration name</Text>}
          placeholder={"Iteration Name"}
          value={iteration.name}
          onChange={e => onChangeIterationData("name", e.target.value)}
          allowClear={true}
          style={{ marginTop: 20 }}
        />
        {checkValidationErrors("iterationName") && (
          <Text className={"error-text"}>
            {createIterationValidationErrors["iterationName"][0]}
          </Text>
        )}
      </div>
      <Input.TextArea
        placeholder={"Description"}
        value={iteration.description}
        onChange={e => onChangeIterationData("description", e.target.value)}
        autosize={{ minRows: 4 }}
        style={{ marginTop: 20 }}
      />
      {checkValidationErrors("iterationDescription") && (
        <Text className={"error-text"}>
          {createIterationValidationErrors["iterationDescription"][0]}
        </Text>
      )}
      <div>
        <DatePicker
          placeholder={"End Date"}
          format={"DD-MM-YYYY"}
          showToday={false}
          disabledDate={disabledDate}
          onChange={e => onChangeIterationData("endDate", e)}
          style={{ marginTop: 20 }}
        />
      </div>
      {checkValidationErrors("iterationEndDate") && (
        <Text className={"error-text"}>
          {createIterationValidationErrors["iterationEndDate"][0]}
        </Text>
      )}
    </div>
  );
};

export default CreateIterationForm;
