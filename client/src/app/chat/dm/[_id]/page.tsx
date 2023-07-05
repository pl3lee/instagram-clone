"use client";
import ChatHeader from "@/app/components/ChatHeader";
import useUser from "@/app/hooks/useUser";
import fetcher from "@/app/helpers/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { UserInterface } from "@/app/interfaces/User";
import LoadingComponent from "@/app/components/LoadingComponent";
import ProfilePictureIcon from "@/app/components/ProfilePictureIcon";
import { Input } from "@rewind-ui/core";

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

  const handleSubmit = (e: React.FormEvent) => {};

  if (!localUserLoading && !chatroomUsersLoading && chatUser && localUser) {
    return (
      <div className="flex flex-col">
        <ChatHeader user={chatUser} />
        <div className="flex justify-center items-center bottom-0 left-0 fixed p-4 w-full">
          <div className="flex-grow-7 justify-start items-center flex">
            <form onSubmit={handleSubmit} className="w-full">
              <Input
                withRing={false}
                color="gray"
                className="rounded-full bg-black border border-borderGray"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Message ${chatUser.username}`}
                rightIcon={
                  <button
                    type="submit"
                    className="justify-center flex items-center"
                    disabled={chatInput.length === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      className="w-6 h-6 stroke-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </button>
                }
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
