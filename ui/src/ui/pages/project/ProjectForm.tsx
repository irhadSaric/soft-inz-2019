import * as React from "react";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Form,
  List,
  DatePicker,
  Modal
} from "antd";
import Text from "antd/lib/typography/Text";
import { IProject } from "../../../model/project/Project";
import moment from "moment";
import { IIteration } from "../../../model/iteration/iteration";
import CreateIterationForm from "../iteration/CreateIterationForm";

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const ProjectForm = ({
  translate,
  project,
  isEditable,
  onEditBtnClick,
  onCancelBtnClick,
  editButtonDisabled,
  validationErrors,
  onChangeProjectData,
  updateProjectDetails,
  onCreateIterationBtnClick,
  onCancelIterationModalButtonClick,
  createIterationValidationErrors,
  createIteration,
  iteration,
  onChangeIterationData,
  isCreateIterationModalVisible,
  activeIteration,
  completedIterations,
  showIterationPage
}: {
  translate: any;
  project: IProject;
  isEditable: boolean;
  onEditBtnClick: any;
  onCancelBtnClick: any;
  editButtonDisabled: boolean;
  onChangeProjectData(key: string, value: any): void;
  validationErrors: any;
  updateProjectDetails: any;
  onCreateIterationBtnClick(): void;
  onCancelIterationModalButtonClick(): void;
  onChangeIterationData(key: string, value: any): void;
  iteration: IIteration;
  createIteration(): void;
  createIterationValidationErrors: any;
  isCreateIterationModalVisible: boolean;
  activeIteration: IIteration;
  completedIterations: IIteration[];
  showIterationPage: any;
}) => {
  const checkValidationErrors = (fieldName: string) => {
    return validationErrors && validationErrors[fieldName].length > 0;
  };
  const activeIterationList = [activeIteration];
  const data2 = ["backolg1", "backlog2"];
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
        <Avatar style={{ marginLeft: 20 }} size={150} icon="project" />
      </div>
      <Divider
        style={{ height: "auto", background: "#cccccc" }}
        type={"vertical"}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Form>
          <Form.Item
            validateStatus={checkValidationErrors("name") ? "error" : undefined}
          >
            <div className={"form-item"}>
              <Input
                addonBefore={<Text>Project Name</Text>}
                placeholder={"Project Name"}
                value={project.name}
                onChange={e => onChangeProjectData("name", e.target.value)}
                allowClear={true}
                style={{ marginTop: 20, width: 400 }}
                readOnly={!isEditable}
              />
              {checkValidationErrors("name") && (
                <Text className={"error-text"}>
                  {validationErrors["name"][0]}
                </Text>
              )}
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
                value={project.description}
                onChange={e =>
                  onChangeProjectData("description", e.target.value)
                }
                autosize={{ minRows: 4 }}
                style={{ marginTop: 20 }}
                readOnly={!isEditable}
              />
              {checkValidationErrors("description") && (
                <Text className={"error-text"}>
                  {validationErrors["description"][0]}
                </Text>
              )}
            </div>
          </Form.Item>
          <Form.Item
            validateStatus={
              checkValidationErrors("endDate") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
              <DatePicker
                placeholder={"End Date"}
                format={"DD-MM-YYYY"}
                showToday={false}
                value={moment(project.endDate)}
                disabledDate={disabledDate}
                onChange={e => onChangeProjectData("endDate", e)}
                disabled={!isEditable}
                style={{ marginTop: 20 }}
              />
              {checkValidationErrors("endDate") && (
                <Text className={"error-text"}>
                  {validationErrors["endDate"][0]}
                </Text>
              )}
            </div>
          </Form.Item>
          <Form.Item>
            <div className={"form-item"}>
              <h3 style={{ margin: "16px 0" }}>
                Iterations
                {Object.entries(activeIteration).length === 0 && (
                  <Button
                    type="primary"
                    style={{ float: "right" }}
                    onClick={onCreateIterationBtnClick}
                  >
                    +
                  </Button>
                )}
                <Modal
                  title="Create iteration"
                  visible={isCreateIterationModalVisible}
                  onOk={createIteration}
                  onCancel={onCancelIterationModalButtonClick}
                  maskClosable={false}
                >
                  <CreateIterationForm
                    iteration={iteration}
                    onChangeIterationData={onChangeIterationData}
                    createIterationValidationErrors={
                      createIterationValidationErrors
                    }
                  />
                </Modal>
              </h3>
              <List
                size="small"
                bordered
                dataSource={activeIterationList}
                renderItem={item => (
                  <List.Item
                    onClick={() => {
                      showIterationPage(item.id);
                    }}
                  >
                    {item.name}
                  </List.Item>
                )}
              />
              {completedIterations.length !== 0 && (
                <List
                  size="small"
                  bordered
                  dataSource={completedIterations}
                  renderItem={item => <List.Item>{item.name}</List.Item>}
                />
              )}
            </div>
          </Form.Item>
          <Form.Item>
            <div className={"form-item"}>
              <h3 style={{ margin: "16px 0" }}>Backlog</h3>
              <List
                size="small"
                bordered
                dataSource={data2}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
          </Form.Item>
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
              disabled={editButtonDisabled}
              onClick={updateProjectDetails}
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

export default ProjectForm;
