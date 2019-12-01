import { INotificationService } from "../../service/notification/NotificationService";

export default class ShowInfoMessageInteractor {
  private notificationService: INotificationService;

  constructor({ notificationService }) {
    this.notificationService = notificationService;
  }

  execute(message: string) {
    this.notificationService.showInfo(message);
  }
}
