"use client";
import LoadingComponent from "../components/LoadingComponent";
import fetcher from "../helpers/fetcher";
import useUser from "../hooks/useUser";
import useSWR from "swr";
import { NotificationInterface } from "../interfaces/Notification";
import ProfilePictureIcon from "../components/ProfilePictureIcon";
import { PostInterface } from "../interfaces/Post";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import { backendURL } from "../backendURL";
const Notifications = () => {
  const { user, isLoading: userLoading } = useUser();
  const { data: notifications, isLoading: notificationsLoading } = useSWR(
    !userLoading && user
      ? `${backendURL}/users/notifications/notification/${user._id}`
      : null,
    fetcher
  );
  useEffect(() => {
    if (!userLoading && user) {
      axios
        .patch(
          `${backendURL}/users/notifications/read/${user?._id}`,
          {},
          {
            headers: {
              "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
            },
          }
        )
        .catch((err) => console.log(err));
    }
  }, [userLoading, user]);

  if (userLoading || notificationsLoading) return <LoadingComponent />;
  return (
    <div className="flex flex-col p-2 gap-4">
      {notifications.map((notification: NotificationInterface) => {
        return (
          <Notification key={notification._id} notification={notification} />
        );
      })}
    </div>
  );
};

const Notification = ({
  notification,
}: {
  notification: NotificationInterface;
}) => {
  const {
    data: senderUser,
    error: senderUserError,
    isLoading: senderUserLoading,
  } = useSWR(`${backendURL}/users/user/${notification.senderId}`, fetcher);
  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useSWR(
    notification.postRef
      ? `${backendURL}/posts/post/${notification.postRef}`
      : null,
    fetcher
  );
  if (senderUserLoading || postLoading) return <LoadingComponent />;
  else {
    let notificationDescription = "";
    let postRef = <div></div>;
    if (notification.notification === "comment") {
      notificationDescription = `${senderUser.username} commented on your post!`;
      postRef = PostRef(post);
    } else if (notification.notification === "like") {
      notificationDescription = `${senderUser.username} liked your post!`;
      postRef = PostRef(post);
    } else if (notification.notification === "follow") {
      notificationDescription = `${senderUser.username} followed you!`;
    }
    return (
      <div className="flex gap-2 justify-between">
        <div className="flex justify-center items-center">
          <Link href={`/profile/${senderUser._id}`}>
            <ProfilePictureIcon image={senderUser.profilePicture} size="lg" />
          </Link>
        </div>

        <div className="flex flex-1 items-center">
          {notificationDescription}
        </div>
        <div className="flex items-center justify-center">{postRef}</div>
      </div>
    );
  }
};

const PostRef = (post: PostInterface) => {
  return (
    <div>
      <Link href={`/posts/${post._id}`}>
        <img src={post.img} className="w-[50px] h-[50px] object-cover" />
      </Link>
    </div>
  );
};

export default Notifications;
