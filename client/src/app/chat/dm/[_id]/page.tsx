"use client";
import ChatHeader from "@/app/components/ChatHeader";
import useUser from "@/app/hooks/useUser";
import fetcher from "@/app/helpers/fetcher";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { UserInterface } from "@/app/interfaces/User";
import LoadingComponent from "@/app/components/LoadingComponent";
import ProfilePictureIcon from "@/app/components/ProfilePictureIcon";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import MessageInput from "@/app/components/MessageInput";
import { MessageInterface } from "@/app/interfaces/Message";
import axios from "axios";
import { io } from "socket.io-client";
import { backendURL } from "@/app/backendURL";

const socket = io(backendURL || "/", {
  path: "/socket.io",
  transports: ["websocket", "polling"],
  secure: true,
});

const DMChat = ({ params }: { params: { _id: string } }) => {
  const { _id } = params;
  const { user: localUser, isLoading: localUserLoading } = useUser();
  const {
    data: chatroomUsers,
    isLoading: chatroomUsersLoading,
    error: chatroomUsersError,
  } = useSWR(`${backendURL}/chat/dm/room/users/${_id}`, fetcher);
  const [chatUser, setChatUser] = useState<UserInterface | null>(null);

  const [chatInput, setChatInput] = useState("");

  const [chatMessages, setChatMessages] = useState<MessageInterface[]>([]);

  useEffect(() => {
    socket.emit("join_room", _id);
    socket.on("receive_message", (data) => {
      setChatMessages((prevState: any) => [...prevState, data]);
    });
  }, [_id]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const {
    data: chatroom,
    isLoading: chatroomLoading,
    error: chatroomError,
  } = useSWR(
    !localUserLoading && chatUser && localUser
      ? `${backendURL}/chat/dm/${localUser._id}/${chatUser._id}`
      : null,
    fetcher
  );

  const {
    data: initialChatMessages,
    isLoading: initialChatMessagesLoading,
    error: initialChatMessagesError,
  } = useSWRImmutable(
    !chatroomLoading && chatroom
      ? `${backendURL}/chat/messages/${chatroom._id}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (!localUserLoading && !chatroomUsersLoading && localUser) {
      const otherUser = chatroomUsers.filter(
        (user: UserInterface) => user._id != localUser._id
      )[0];
      setChatUser(otherUser);
    }
  }, [localUserLoading, chatroomUsersLoading, localUser, chatroomUsers]);

  useEffect(() => {
    if (!initialChatMessagesLoading && initialChatMessages) {
      setChatMessages(initialChatMessages);
    }
  }, [initialChatMessagesLoading, initialChatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !localUserLoading &&
      !chatroomUsersLoading &&
      !chatroomLoading &&
      localUser &&
      chatInput != ""
    ) {
      socket.emit(
        "send_message",
        {
          message: chatInput,
          chatroom: _id,
          senderId: localUser._id,
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
        (newMessage: MessageInterface) => {
          setChatMessages((prevState: any) => [...prevState, newMessage]);
        }
      );
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
      <div className="flex flex-col pb-20 w-full">
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
          <div ref={messagesEndRef} />
        </div>

        <div className="flex justify-center items-center bottom-0 left-0 fixed p-4 w-full dark:bg-black bg-white">
          <div className="flex-grow-7 justify-start items-center flex w-full">
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
        isLocal
          ? "bg-accentBlue text-white"
          : "bg-[#efefef] dark:bg-backgroundGray text-black dark:text-white"
      } rounded-xl max-w-[90%] break-words whitespace-pre-line`}
    >
      {content}
    </div>
  );
};

export default DMChat;
