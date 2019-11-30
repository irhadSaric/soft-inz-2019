import * as React from "react";
import { Alert } from "antd";

const AlertMessage = ({
  message,
  type
}: {
  message: string;
  type: "success" | "info" | "warning" | "error";
}) => <Alert closable message={message} type={type} />;

export default AlertMessage;
