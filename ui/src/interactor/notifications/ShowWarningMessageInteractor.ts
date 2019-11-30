import { INotificationService } from "../../service/notification/NotificationService";

export default class ShowWarningMessageInteractor {
  private notificationService: INotificationService;

  constructor({ notificationService }) {
    this.notificationService = notificationService;
  }

  execute(message: string) {
    this.notificationService.showWarning(message);
  }
}
