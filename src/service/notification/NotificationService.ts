import { message } from "antd";
import AlertMessage from "../../ui/components/app/AlertMessage";

export interface INotificationService {
  showError(messageText: string): void;
  showSuccess(messageText: string): void;
  showInfo(messageText: string): void;
  showWarning(messageText: string): void;
}

const DURATION_MESSAGE = 3;

const NotificationService = (): INotificationService => {
  const formatMessageText = (messageText: string) => {
    const splitMessage = messageText.split("-");
    if (splitMessage.length === 2) {
      return splitMessage[1];
    } else return messageText;
  };

  const showMessage = (
    messageText: string,
    type: "success" | "info" | "warning" | "error"
  ) => {
    message.open({
      content: AlertMessage({
        message: formatMessageText(messageText),
        type
      }),
      duration: DURATION_MESSAGE,
      type
    });
  };

  return {
    showError(messageText: string) {
      showMessage(messageText, "error");
    },

    showSuccess(messageText: string) {
      showMessage(messageText, "success");
    },

    showInfo(messageText: string) {
      showMessage(messageText, "info");
    },

    showWarning(messageText: string) {
      showMessage(messageText, "warning");
    }
  };
};

export default NotificationService;
