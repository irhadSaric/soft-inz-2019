import { INotificationService } from "../../service/notification/NotificationService";

export default class ShowErrorMessageInteractor {
  private notificationService: INotificationService;

  constructor({ notificationService }) {
    this.notificationService = notificationService;
  }

  execute(message: string) {
    this.notificationService.showError(message);
  }
}
