import * as React from "react";
import { Divider, Input, Form, Select, Button, Spin } from "antd";
import { ITicket } from "../../../model/ticket/Ticket";
import { ITicketDetails } from "../../../model/ticket/TicketDetails";
import Text from "antd/lib/typography/Text";
import { TSelectValuePresentationModel } from "../../../presenter/main/HomePresenter";
import { IUser } from "../../../model/user/User";

const { Option } = Select;

const TicketForm = ({
    translate,
    isEditable,
    onCancelBtnClick,
    validationErrors,
    isLoading,
    ticket,
    ticketDetails,
    onChangeTicketData,
    users,
    assignUserToTask,
    onChangeSelectUserList,
    selectedUsers,
    onChangeSelectSearch,
    userListLoading,
    onDropdownVisibleChange,
    onEditBtnClick,
    updateTicketDetails,
    editButtonDisabled
}: {
    translate: any,
    isEditable: boolean;
    onCancelBtnClick: any;
    validationErrors: any;
    isLoading: boolean;
    ticket: ITicket;
    ticketDetails: ITicketDetails;
    onChangeTicketData(key: string, value: any): void;
    assignUserToTask: any;
    users: IUser[];
    selectedUsers: TSelectValuePresentationModel[];
    onChangeSelectUserList: any;
    onChangeSelectSearch(value: string): void;
    userListLoading?: boolean;
    onDropdownVisibleChange(value: boolean): void;
    onEditBtnClick: any;
    updateTicketDetails: any;
    editButtonDisabled: boolean;
}) => {
    const checkValidationErrors = (fieldName: string) => {
        return validationErrors && validationErrors[fieldName].length > 0;
    };
    console.log(ticketDetails);

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
            <Form>
                <Form.Item
                    validateStatus={checkValidationErrors("name") ? "error" : undefined}
                >
                    <div className={"form-item"}>
                        <Input
                            placeholder={"Ticket Name"}
                            value={ticketDetails.name}
                            onChange={e => onChangeTicketData("name", e.target.value)}
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
                <Divider
                    style={{ height: "auto", background: "#cccccc" }}
                    type={"horizontal"}
                />
                <Form.Item
                    validateStatus={
                        checkValidationErrors("description") ? "error" : undefined
                    }
                >
                    <div className={"form-item"}>
                        <Input.TextArea
                            placeholder={"Description"}
                            value={ticketDetails.description}
                            onChange={e => onChangeTicketData("description", e.target.value)}
                            style={{ marginTop: 20, width: 400 }}
                            readOnly={!isEditable}
                        />
                        {checkValidationErrors("description") && (
                            <Text className={"error-text"}>
                                {validationErrors["name"][0]}
                            </Text>
                        )}
                    </div>
                </Form.Item>
                <Select
                    placeholder="Task Level"
                    style={{ marginTop: 20, width: 400 }}
                >
                </Select>

                <Select
                    labelInValue
                    value={selectedUsers}
                    placeholder="Assign user"
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
                    style={{ marginTop: 20, width: 400 }}
                    loading={userListLoading}
                    autoClearSearchValue={true}
                    onDropdownVisibleChange={e => onDropdownVisibleChange(e)}
                >{users.map(user => (
                    <Option key={user.id}>{user.firstName} {user.lastName} </Option>
                ))}
                </Select>


                <Select
                    labelInValue
                    value={ticketDetails.status}
                    placeholder="Status"
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
                    style={{ marginTop: 20, width: 400 }}
                    autoClearSearchValue={true}
                >
                </Select>
            </Form>


            <div>
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
                            onClick={updateTicketDetails}
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

export default TicketForm;
