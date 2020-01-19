import * as React from "react";
import { PageHeader, Input, Form, List, Row, Col, Button, Modal } from "antd";
import { IIterationTicket } from "../../../model/iteration/IterationTicket";
import { TIterationPresentationModel } from "../../../presenter/iteration/IterationPresenter";
import { ITicket } from "../../../model/ticket/Ticket";
import CreateTicketForm from "../ticket/CreateTicketForm";

const IterationForm = ({
  translate,
  iteration,
  iterationTickets,
  isEditable,
  validationErrors,
  showTicketPage,
  onCreateTicketBtnClick,
  onCancelTicketModalButtonClick,
  createTicketValidationErrors,
  createTicket,
  ticket,
  onChangeTicketData,
  isCreateTicketModalVisible
}: {
  translate: any;
  iteration: TIterationPresentationModel;
  iterationTickets: IIterationTicket[];
  isEditable: boolean;
  validationErrors: any;
  showTicketPage: any;
  onCreateTicketBtnClick(): void;
  onCancelTicketModalButtonClick(): void;
  onChangeTicketData(key: string, value: any): void;
  ticket: ITicket;
  createTicket(): void;
  createTicketValidationErrors: any;
  isCreateTicketModalVisible: boolean;

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
          <Form.Item>
            <div
              className={"form-item"}
              style={{ borderBottom: "1px solid rgb(235, 237, 240)" }}
            >
              <PageHeader
                style={{
                  border: '1px solid rgb(235, 237, 240)',
                }}
                title={iteration.name}
                subTitle={iteration.startDate + "-" + iteration.endDate}
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
          <Form.Item>
            <div className={"form-item"}>
              <PageHeader
                style={{
                  border: '1px solid rgb(235, 237, 240)',
                }}
                title="Tasks"
              />
            </div>
            <Button
              type="primary"
              style={{ float: "right" }}
              onClick={onCreateTicketBtnClick}
            >
              +
                </Button>
            <Modal
              title="Create Ticket"
              visible={isCreateTicketModalVisible}
              onOk={createTicket}
              onCancel={onCancelTicketModalButtonClick}
              maskClosable={false}
            >
              <CreateTicketForm
                ticket={ticket}
                onChangeTicketData={onChangeTicketData}
                createTicketValidationErrors={
                  createTicketValidationErrors
                }
              />
            </Modal>
          </Form.Item>
          <Form.Item>
            <div className={"form-item"}>
              <Row type="flex">
                <Col span={8}>
                  To-do
                <List
                    size="small"
                    bordered
                    dataSource={iterationTickets}
                    renderItem={item => (
                      <List.Item
                        onClick={() => {
                          showTicketPage(item.ticketTypeId);
                        }}
                      >
                        {item.name}
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={8}>In progress</Col>
                <Col span={8}>Done</Col>
              </Row>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default IterationForm;
