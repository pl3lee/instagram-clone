"use client";
import LoadingComponent from "../components/LoadingComponent";
import fetcher from "../helpers/fetcher";
import useUser from "../hooks/useUser";
import useSWR from "swr";
import { NotificationInterface } from "../interfaces/Notification";
const Notifications = () => {
  const { user, isLoading: userLoading } = useUser();
  const { data: notifications, isLoading: notificationsLoading } = useSWR(
    !userLoading && user
      ? `http://localhost:3001/users/notifications/${user._id}`
      : null,
    fetcher
  );
  if (userLoading || notificationsLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification: NotificationInterface) => (
        <div className="flex flex-col gap-2" key={notification._id}>
          {notification.notification}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
