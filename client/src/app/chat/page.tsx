"use client";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import Link from "next/link";
import { UserInterface } from "../interfaces/User";
import ProfilePictureIcon from "../components/ProfilePictureIcon";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import useUser from "../hooks/useUser";
import LoadingComponent from "../components/LoadingComponent";
import GenericHeader from "../components/GenericHeader";
import { backendURL } from "../backendURL";

const Chat = () => {
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { user: localUser, isLoading: localUserLoading } = useUser();
  const {
    data: dmsUsers,
    isLoading: dmsUsersLoading,
    error: dmsUsersError,
  } = useSWR(
    !localUserLoading && localUser
      ? `${backendURL}/chat/dms/${localUser._id}`
      : null,
    fetcher
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== "") {
        axios
          .get(`${backendURL}/users/search/${search}`)
          .then((users) => {
            setSearchedUsers(
              users.data.filter((user: UserInterface) => {
                return user._id != localUser?._id;
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setSearchedUsers([]);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  if (!localUserLoading && !dmsUsersLoading) {
    return (
      <div>
        <GenericHeader title="Chat" />
        <div className="flex flex-col gap-2">
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Search for other users..."
          />
          <div>
            {search != ""
              ? searchedUsers.map((user: UserInterface) => {
                  return (
                    <div key={user.username}>
                      <DmsUser dmsUser={user} localUser={localUser} />
                    </div>
                  );
                })
              : dmsUsers.map((dmsUser: UserInterface) => {
                  return (
                    <div key={dmsUser._id}>
                      <DmsUser dmsUser={dmsUser} localUser={localUser} />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
  return <LoadingComponent />;
};

const DmsUser = ({
  dmsUser,
  localUser,
}: {
  dmsUser: UserInterface | null;
  localUser: UserInterface | null;
}) => {
  const {
    data: chatroom,
    isLoading: chatroomLoading,
    error: chatroomError,
  } = useSWR(
    localUser && dmsUser
      ? `${backendURL}/chat/dm/${localUser._id}/${dmsUser._id}`
      : null,
    fetcher
  );

  if (!chatroomLoading && !chatroomError && localUser && dmsUser) {
    return (
      <Link
        href={`/chat/${
          chatroom ? `dm/${chatroom._id}` : `create/${dmsUser._id}`
        }`}
      >
        <div className="flex gap-1 px-2 py-3">
          <ProfilePictureIcon image={dmsUser.profilePicture} size="lg" />
          <div className="flex-grow-[9] text-lg font-bold flex items-center ml-3">
            {dmsUser.username}
          </div>
        </div>
      </Link>
    );
  } else {
    return <LoadingComponent />;
  }
};

export default Chat;
