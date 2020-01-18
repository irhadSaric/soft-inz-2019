import * as React from "react";
import { Divider, Input, Form, Select } from "antd";
import { ITicket } from "../../../model/ticket/Ticket";
import { ITicketDetails } from "../../../model/ticket/TicketDetails";
import Text from "antd/lib/typography/Text";
import { TSelectValuePresentationModel } from "../../../presenter/main/HomePresenter";
import { IUser } from "../../../model/user/User";


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
    selectedUsers
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
                            readOnly={isEditable}
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
                            readOnly={isEditable}
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
                    style={{ width: "100%", marginTop: 20 }}
                >
                </Select>

                <Select
                    placeholder="Assigned User"
                    style={{ width: "100%", marginTop: 20 }}
                    labelInValue
                    value={ticket.assignee}
                    onChange={e => assignUserToTask(e)}
                >
                    {users.map(item => (
                        <Select.Option key={item.id}>
                            {item.firstName} {item.lastName}
                        </Select.Option>
                    ))}
                </Select>

                <Select
                    placeholder="Status"
                    style={{ width: "100%", marginTop: 20 }}
                    labelInValue
                    value={ticketDetails.status}
                >
                  
                </Select>
            </Form>
        </div>
    );
};

export default TicketForm;
