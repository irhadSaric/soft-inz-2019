import * as React from "react";
import { PageHeader, Input, Form, List } from "antd";
import Text from "antd/lib/typography/Text";
import { IIteration } from "../../../model/iteration/Iteration";

const IterationForm = ({
  translate,
  iteration,
  isEditable,
  onEditBtnClick,
  onCancelBtnClick,
  editButtonDisabled,
  validationErrors,
  isLoading,
}: {
  translate: any;
  iteration: IIteration;
  isEditable: boolean;
  onEditBtnClick: any;
  onCancelBtnClick: any;
  editButtonDisabled: boolean;
  validationErrors: any;
  isLoading: boolean;
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
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Form>
          <Form.Item
            validateStatus={
              checkValidationErrors("name") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
            <PageHeader
              style={{
                border: '1px solid rgb(235, 237, 240)',
              }}  
              title={iteration.name}
              subTitle={iteration.startDate}
            />
            </div>
          </Form.Item>
          <Form.Item
            validateStatus={
              checkValidationErrors("description") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
            <Input.TextArea
              placeholder={"Description"}
              value={iteration.description}
              autosize={{ minRows: 4 }}
              style={{ marginTop: 20 }}
              readOnly={!isEditable}
            />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default IterationForm;
