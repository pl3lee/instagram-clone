"use client";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import FormRequirement from "@/app/components/FormRequirement";
import useUser from "@/app/hooks/useUser";
import ProfilePictureIcon from "@/app/components/ProfilePictureIcon";
import LoadingComponent from "@/app/components/LoadingComponent";
import { backendURL } from "@/app/backendURL";

const Edit = () => {
  const router = useRouter();
  const { refetchUser } = useContext(AuthContext);
  const { user, isLoading } = useUser();

  const [username, setUsername] = useState("");
  const [usernameNotExists, setUsernameNotExists] = useState(false);
  const [usernameGoodLength, setUsernameGoodLength] = useState(false);
  const [usernameNoSpaces, setUsernameNoSpaces] = useState(false);
  const [usernameAcceptable, setUsernameAcceptable] = useState(false);

  const [bio, setBio] = useState("");

  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureAcceptable, setProfilePictureAcceptable] =
    useState(false);

  const [dataAcceptable, setDataAcceptable] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .patch(
        `${backendURL}/users/update/${user?._id}`,
        {
          username,
          bio,
          profilePicture,
        },
        {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
          },
        }
      )
      .then((response) => {
        refetchUser();
        router.push(`/profile/${user?._id}`);
      })
      .catch((err) => console.log(err));
  };

  // checks username exists
  useEffect(() => {
    if (username != "") {
      axios.get(`${backendURL}/users/exists/${username}`).then((response) => {
        setUsernameNotExists(!response.data.exists);
      });
      setUsernameGoodLength(username.length >= 5 && username.length <= 15);
      setUsernameNoSpaces(!username.includes(" "));
    }
  }, [username]);

  useEffect(() => {
    if (username == "") {
      setUsernameAcceptable(true);
    } else {
      setUsernameAcceptable(
        usernameNotExists && usernameGoodLength && usernameNoSpaces
      );
    }
  }, [usernameNotExists, usernameGoodLength, usernameNoSpaces, username]);

  useEffect(() => {
    if (profilePicture == "") {
      setProfilePictureAcceptable(true);
    } else {
      const img = new Image();
      img.src = profilePicture;
      new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      }).then((result) => {
        setProfilePictureAcceptable(result);
      });
    }
  }, [profilePicture]);

  // checks that all requirements are met
  useEffect(() => {
    if (username == "" && bio == "" && profilePicture == "") {
      setDataAcceptable(false);
    } else {
      setDataAcceptable(usernameAcceptable && profilePictureAcceptable);
    }
  }, [
    usernameAcceptable,
    username,
    bio,
    profilePicture,
    profilePictureAcceptable,
  ]);
  if (!isLoading && user) {
    return (
      <div className="flex flex-col p-3 gap-3">
        <div className="flex">
          <div className="flex-grow-[2]">
            <ProfilePictureIcon
              image={user ? user.profilePicture : ""}
              size="xl"
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
          {username.length > 0 && (
            <div className="flex flex-col gap-1">
              <FormRequirement
                text="Username must be unique"
                state={usernameNotExists}
              />
              <FormRequirement
                text="Username must be between 5 and 15 characters"
                state={usernameGoodLength}
              />
              <FormRequirement
                text="Username must not contain spaces"
                state={usernameNoSpaces}
              />
            </div>
          )}

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
          {profilePicture.length > 0 && (
            <div className="flex flex-col gap-1">
              <FormRequirement
                text="Profile picture must be a valid image link"
                state={profilePictureAcceptable}
              />
            </div>
          )}

          <button
            className="bg-accentBlue rounded-lg py-1 text-white disabled:bg-gray-400"
            type="submit"
            disabled={!dataAcceptable}
          >
            Save
          </button>
        </form>
        <button className="bg-accentBlue rounded-lg py-1 text-white">
          <Link href={`/profile/${user._id}`}>Go Back</Link>
        </button>
      </div>
    );
  } else {
    return <LoadingComponent />;
  }
};

export default Edit;
