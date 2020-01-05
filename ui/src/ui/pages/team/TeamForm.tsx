import * as React from "react";
import { Avatar, Button, Divider, Input, Form, List } from "antd";
import Text from "antd/lib/typography/Text";
import { ITeamDetails } from "../../../model/team/TeamDetails";
import { ITeamProject } from "../../../model/team/TeamProject";
import { IActiveTeamMember } from "../../../model/team/ActiveTeamMember";

const TeamForm = ({
  translate,
  teamDetails,
  teamProjects,
  isEditable,
  onEditBtnClick,
  onCancelBtnClick,
  editButtonDisabled,
  validationErrors,
  isLoading,
  onChangeTeamData,
  updateTeamDetails,
  activeTeamMembers
}: {
  translate: any,
  teamDetails: ITeamDetails;
  teamProjects: ITeamProject[];
  activeTeamMembers: IActiveTeamMember[];
  isEditable: boolean;
  onEditBtnClick: any;
  onCancelBtnClick: any;
  editButtonDisabled: boolean;
  validationErrors: any;
  isLoading: boolean;
  updateTeamDetails: any
  onChangeTeamData(key: string, value: any): void;
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
              checkValidationErrors("name") ? "error" : undefined
            }
          >
            <div className={"form-item"}>
              <Input
                addonBefore={<Text>Team Name</Text>}
                placeholder={"Team Name"}
                value={teamDetails.name}
                onChange={e => onChangeTeamData("name", e.target.value)}
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
              value={teamDetails.description}
              onChange={e => onChangeTeamData("description", e.target.value)}
              autosize={{ minRows: 4 }}
              style={{ marginTop: 20 }}
              readOnly={!isEditable}
            />
            </div>
          </Form.Item>
          <Form.Item>
            <div className={"form-item"}>
              <h3 style={{ margin: '16px 0' }}>Projects</h3>
              <List
                size="small"
                bordered
                dataSource={teamProjects}
                renderItem={item => <List.Item>{item.name}</List.Item>}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className={"form-item"}>
              <h3 style={{ margin: '16px 0' }}>Users</h3>
              <List
                size="small"
                bordered
                dataSource={activeTeamMembers}
                renderItem={item => <List.Item>{item.firstName}</List.Item>}
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
              loading={isLoading}
              disabled={editButtonDisabled}
              onClick={updateTeamDetails}
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