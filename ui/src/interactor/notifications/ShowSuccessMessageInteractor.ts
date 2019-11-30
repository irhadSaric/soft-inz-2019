import { INotificationService } from "../../service/notification/NotificationService";

export default class ShowSuccessMessageInteractor {
  private notificationService: INotificationService;

  constructor({ notificationService }) {
    this.notificationService = notificationService;
  }

  execute(message: string) {
    this.notificationService.showSuccess(message);
  }
}
