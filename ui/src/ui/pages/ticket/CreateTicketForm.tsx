import * as React from "react";
import { Input, Select, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { ITicket } from "../../../model/ticket/Ticket";

const { Option } = Select;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

const CreateTicketForm = ({
  ticket,
  onChangeTicketData,
  validationTicketErrors
}: {
  onChangeTicketData(key: string, value: any): void;
  ticket: ITicket;
  validationTicketErrors: any;
}) => {
  const checkValidationErrors = (fieldName: string) => {
    return (
      validationTicketErrors && validationTicketErrors[fieldName].length > 0
    );
  };
  return (
    <div>
      <div>
        <Input
          addonBefore={<Text>Ticket name</Text>}
          placeholder={"Ticket Name"}
          value={ticket.name}
          onChange={e => onChangeTicketData("name", e.target.value)}
          allowClear={true}
          style={{ marginTop: 20 }}
        />
        {checkValidationErrors("ticketName") && (
          <Text className={"error-text"}>
            {validationTicketErrors["ticketName"][0]}
          </Text>
        )}
      </div>
      <Input.TextArea
        placeholder={"Description"}
        value={ticket.description}
        onChange={e => onChangeTicketData("description", e.target.value)}
        autosize={{ minRows: 4 }}
        style={{ marginTop: 20 }}
      />
      {checkValidationErrors("ticketDescription") && (
        <Text className={"error-text"}>
          {validationTicketErrors["ticketDescription"][0]}
        </Text>
      )}
      <div>
        <DatePicker
          placeholder={"End Date"}
          format={"DD-MM-YYYY"}
          showToday={false}
          disabledDate={disabledDate}
          onChange={e => onChangeTicketData("endDate", e)}
          style={{ marginTop: 20 }}
        />
      </div>
      {checkValidationErrors("ticketEndDate") && (
        <Text className={"error-text"}>
          {validationTicketErrors["ticketEndDate"][0]}
        </Text>
      )}
    </div>
  );
};

export default CreateTicketForm;
