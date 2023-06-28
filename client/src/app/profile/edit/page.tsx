"use client";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import Error from "@/app/error";

const Edit = () => {
  const router = useRouter();
  const { refetchUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = JSON.parse(window.localStorage.getItem("user"));
    console.log(getUser);
    if (!getUser) {
      router.push("/auth/login");
    } else {
      setUser(getUser);
    }
  }, []);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/users/update/${user._id}`, {
        username,
        bio,
        profilePicture,
      })
      .then((response) => {
        console.log("response from update", response);
        refetchUser();
        router.push("/profile");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col p-3 gap-3">
      <div className="flex">
        <div className="flex-shrink-0 flex-grow-[2]">
          <img
            src={user?.profilePicture}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-grow-[8] items-center text-xl">
          {user?.username}
        </div>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-xl font-bold">Username</label>
        <input
          className="auth-input"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label className="text-xl font-bold">Bio</label>
        <input
          className="auth-input"
          onChange={(event) => {
            setBio(event.target.value);
          }}
        />
        <label className="text-xl font-bold">
          Profile Picture (Paste image link)
        </label>
        <input
          className="auth-input"
          onChange={(event) => {
            setProfilePicture(event.target.value);
          }}
        />
        <button
          className="bg-blue-400 rounded-lg py-1 text-white"
          type="submit"
        >
          Save
        </button>
      </form>
      <button className="bg-blue-400 rounded-lg py-1 text-white">
        <Link href="/profile">Go Back</Link>
      </button>
    </div>
  );
};

export default Edit;
