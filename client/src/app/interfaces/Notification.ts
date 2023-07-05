export interface NotificationInterface {
  _id: string;
  senderId: string;
  receiverId: string;
  notification: string;
  read: boolean;
  postRef: string;
  notificationDateTime: string;
}