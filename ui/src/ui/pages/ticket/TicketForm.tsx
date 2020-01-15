import * as React from "react";
import { Divider, Input, Form, Select } from "antd";
import { ITicket } from "../../../model/ticket/Ticket";
import { ITicketDetails } from "../../../model/ticket/TicketDetails";
import Text from "antd/lib/typography/Text";


const TicketForm = ({
    translate,
    isEditable,
    onCancelBtnClick,
    validationErrors,
    isLoading,
    ticket,
    ticketDetails,
    onChangeTicketData
}: {
    translate: any,
    isEditable: boolean;
    onCancelBtnClick: any;
    validationErrors: any;
    isLoading: boolean;
    ticket: ITicket;
    ticketDetails: ITicketDetails;
    onChangeTicketData(key: string, value: any): void;
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
            <Form>
                <Form.Item>
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
                    type={"vertical"}
                />
                <Form.Item
                    validateStatus={
                        checkValidationErrors("description") ? "error" : undefined
                    }
                >
                    validateStatus={checkValidationErrors("name") ? "error" : undefined}
          >
                <div className={"form-item"}>
              <Input
                placeholder={"Ticket Name"}
                value={ticketDetails.description}
                onChange={e => onChangeTicketData("description", e.target.value)}
                allowClear={true}
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
                    style={{ width: "100%", marginTop: 20 }}
                    >
                </Select>
                <Select
                    placeholder="Assigned User"
                    style={{ width: "100%", marginTop: 40}}
                    labelInValue
                    value={ticket.assignee.firstName}
                >
                </Select>
                <Select
                    placeholder="Status"
                    style={{ width: "100%", marginTop: 60 }}
                    labelInValue
                    value={ticketDetails.status}
                >
                </Select>
            </Form>
        </div>
    );
};

export default TicketForm;
