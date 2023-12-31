"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PostInterface } from "../interfaces/Post";
import { UserInterface } from "../interfaces/User";
import ProfilePictureIcon from "../components/ProfilePictureIcon";
import SearchBar from "../components/SearchBar";
import { backendURL } from "../backendURL";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendURL}/posts/all`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
        },
      })
      .then((posts) => {
        setAllPosts(posts.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== "") {
        axios
          .get(`${backendURL}/users/search/${search}`, {
            headers: {
              "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
            },
          })
          .then((users) => {
            setSearchedUsers(users.data);
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

  return (
    <div className="flex flex-col md:max-w-screen-sm md:items-center w-full">
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search for users..."
      />
      <div className="w-full flex items-start flex-col">
        {search != "" ? (
          searchedUsers.map((user: UserInterface) => {
            return (
              <div key={user.username}>
                <User user={user} />
              </div>
            );
          })
        ) : (
          <div className="grid grid-cols-3 pb-20">
            {allPosts.map((post: PostInterface) => {
              return (
                <div key={post._id} className="w-full aspect-square">
                  <Link href={`/posts/${post._id}`}>
                    <img
                      src={post.img}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const User = ({ user }: { user: UserInterface }) => {
  return (
    <div className="flex gap-1 px-2 py-3">
      <ProfilePictureIcon image={user.profilePicture} size="lg" />
      <div className="flex-grow-[9] text-lg font-bold flex items-center ml-3">
        <Link href={`/profile/${user._id}`}>{user.username}</Link>
      </div>
    </div>
  );
};

export default Search;
