import * as React from "react";
import { Divider, Input, Form, Select } from "antd";
import { ITicket } from "../../../model/ticket/Ticket";

const TicketForm = ({
    translate,
    isEditable,
    onCancelBtnClick,
    validationErrors,
    isLoading,
    ticket
}: {
    translate: any,
    isEditable: boolean;
    onCancelBtnClick: any;
    validationErrors: any;
    isLoading: boolean;
    ticket: ITicket;
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
                    <div className={"form-item"}>
                        <h3 style={{ margin: "16px 0" }}>Ticket name</h3>
                    </div>
                </Form.Item>
                <Divider
                    style={{ height: "auto", background: "#cccccc" }}
                    type={"vertical"}
                />
                <Form.Item
                    validateStatus={
                        checkValidationErrors("name") ? "error" : undefined
                    }
                >
                </Form.Item>
                <Form.Item
                    validateStatus={
                        checkValidationErrors("description") ? "error" : undefined
                    }
                >
                    <div className={"form-item"}>
                        <Input.TextArea
                            placeholder={"Description"}
                            autosize={{ minRows: 4 }}
                            style={{ marginTop: 20 }}
                            readOnly={!isEditable}
                        />
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
                >
                </Select>
                <Select
                    placeholder="Status"
                    style={{ width: "100%", marginTop: 60 }}
                >
                </Select>
            </Form>
        </div>
    );
};

export default TicketForm;
