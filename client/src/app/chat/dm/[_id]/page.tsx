"use client";
import ChatHeader from "@/app/components/ChatHeader";
import useUser from "@/app/hooks/useUser";
import fetcher from "@/app/helpers/fetcher";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserInterface } from "@/app/interfaces/User";
import LoadingComponent from "@/app/components/LoadingComponent";
import ProfilePictureIcon from "@/app/components/ProfilePictureIcon";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import MessageInput from "@/app/components/MessageInput";
import { MessageInterface } from "@/app/interfaces/Message";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("localhost:3001");

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

  const [chatMessages, setChatMessages] = useState<MessageInterface[]>([]);

  useEffect(() => {
    socket.emit("join_room", { chatroom: _id });
  }, [_id]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received a message", data);
      setChatMessages((prevState: any) => [...prevState, data]);
    });
  }, [socket]);

  const {
    data: chatroom,
    isLoading: chatroomLoading,
    error: chatroomError,
  } = useSWR(
    !localUserLoading && chatUser && localUser
      ? `http://localhost:3001/chat/dm/${localUser._id}/${chatUser._id}`
      : null,
    fetcher
  );

  const {
    data: initialChatMessages,
    isLoading: initialChatMessagesLoading,
    error: initialChatMessagesError,
  } = useSWRImmutable(
    !chatroomLoading && chatroom
      ? `http://localhost:3001/chat/messages/${chatroom._id}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (!localUserLoading && !chatroomUsersLoading && localUser) {
      const otherUser = chatroomUsers.filter(
        (user: UserInterface) => user._id != localUser._id
      )[0];
      setChatUser(otherUser);
    }
  });

  useEffect(() => {
    if (!initialChatMessagesLoading && initialChatMessages) {
      setChatMessages(initialChatMessages);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !localUserLoading &&
      !chatroomUsersLoading &&
      !chatroomLoading &&
      localUser &&
      chatInput != ""
    ) {
      socket.emit("send_message", {
        message: chatInput,
        chatroom: _id,
        senderId: localUser._id,
      });
      setChatInput("");
    }
  };

  if (
    !localUserLoading &&
    !chatroomUsersLoading &&
    !chatroomLoading &&
    !initialChatMessagesLoading &&
    chatUser &&
    localUser
  ) {
    return (
      <div className="flex flex-col pb-20">
        <ChatHeader user={chatUser} />
        <div className="flex flex-col gap-2 justify-center p-4">
          {chatMessages.map((message: MessageInterface) => {
            return (
              <div key={message._id}>
                <ChatMessage
                  message={message}
                  localUser={localUser}
                  chatUser={chatUser}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center bottom-0 left-0 fixed p-4 w-full dark:bg-black bg-white">
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

const ChatMessage = ({
  message,
  localUser,
  chatUser,
}: {
  message: MessageInterface;
  localUser: UserInterface;
  chatUser: UserInterface;
}) => {
  const [isSelf, setIsSelf] = useState(message.senderId == localUser._id);

  return (
    <div className={`flex w-full ${isSelf ? "justify-end" : "justify-start"}`}>
      <MessageContent content={message.message} isLocal={isSelf} />
    </div>
  );
};

const MessageContent = ({
  content,
  isLocal,
}: {
  content: string;
  isLocal: boolean;
}) => {
  return (
    <div
      className={`py-2 px-4 text-left ${
        isLocal ? "bg-accentBlue" : "bg-backgroundGray"
      } rounded-xl max-w-[90%] break-words whitespace-pre-line`}
    >
      {content}
    </div>
  );
};

export default DMChat;
