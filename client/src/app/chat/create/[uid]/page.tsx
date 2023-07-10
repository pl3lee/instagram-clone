"use client";
import ChatHeader from "@/app/components/ChatHeader";
import useUser from "@/app/hooks/useUser";
import useSWR from "swr";
import fetcher from "@/app/helpers/fetcher";
import MessageInput from "@/app/components/MessageInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { backendURL } from "@/app/backendURL";

const CreateChat = ({ params }: { params: { uid: string } }) => {
  const router = useRouter();
  const { uid } = params;
  const { user: localUser, isLoading: localUserLoading } = useUser();
  const {
    data: chatUser,
    isLoading: chatUserLoading,
    error: chatUserError,
  } = useSWR(`${backendURL}/users/user/${uid}`, fetcher);

  const handleCreateChat = () => {
    axios
      .post(`${backendURL}/chat/create/${localUser?._id}/${chatUser._id}`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
        },
      })
      .then((chatroom) => {
        router.push(`/chat/dm/${chatroom.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!localUserLoading && !chatUserLoading && chatUser && localUser) {
    return (
      <div className="flex flex-col h-screen">
        <ChatHeader user={chatUser} />
        <div className="flex flex-col gap-2 items-center justify-center h-full">
          <button
            className="bg-accentBlue rounded-full p-3 text-white font-bold"
            onClick={handleCreateChat}
          >
            Create Chat
          </button>
        </div>
      </div>
    );
  }
};

export default CreateChat;
