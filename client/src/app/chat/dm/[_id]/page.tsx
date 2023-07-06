"use client";
import ChatHeader from "@/app/components/ChatHeader";
import useUser from "@/app/hooks/useUser";
import fetcher from "@/app/helpers/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { UserInterface } from "@/app/interfaces/User";
import LoadingComponent from "@/app/components/LoadingComponent";
import ProfilePictureIcon from "@/app/components/ProfilePictureIcon";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import MessageInput from "@/app/components/MessageInput";

const DMChat = ({ params }: { params: { _id: string } }) => {
  const { _id } = params;
  const { user: localUser, isLoading: localUserLoading } = useUser();
  const {
    data: chatroomUsers,
    isLoading: chatroomUsersLoading,
    error: chatroomUsersError,
  } = useSWR(`http://localhost:3001/chat/dm/room/users/${_id}`, fetcher);
  const [chatUser, setChatUser] = useState<UserInterface | null>(null);

  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    if (!localUserLoading && !chatroomUsersLoading && localUser) {
      const otherUser = chatroomUsers.filter(
        (user: UserInterface) => user._id != localUser._id
      )[0];
      setChatUser(otherUser);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  if (!localUserLoading && !chatroomUsersLoading && chatUser && localUser) {
    return (
      <div className="flex flex-col">
        <ChatHeader user={chatUser} />
        <div className="flex justify-center items-center bottom-0 left-0 fixed p-4 w-full">
          <div className="flex-grow-7 justify-start items-center flex">
            <form onSubmit={handleSubmit} className="w-full">
              <MessageInput
                inputValue={chatInput}
                setInputValue={setChatInput}
                placeholder={`Message ${chatUser.username}`}
              />
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingComponent />;
  }
};

export default DMChat;
