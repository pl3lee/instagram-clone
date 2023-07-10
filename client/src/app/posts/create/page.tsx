"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import { backendURL } from "@/app/backendURL";

const Create = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [dataAcceptable, setDataAcceptable] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${backendURL}/posts/create/${user?._id}`, {
        img: image,
        caption,
      })
      .then((response) => {
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (image != "") {
      const img = new Image();
      img.src = image;
      new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      }).then((result) => {
        setDataAcceptable(caption != "" && result);
      });
    } else {
      setDataAcceptable(false);
    }
  }, [image, caption]);
  if (!isLoading) {
    return (
      <div className="flex flex-col p-2">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold">Image (Paste Link Here)</label>
            <input
              className="auth-input"
              onChange={(event) => {
                setImage(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold">Caption</label>
            <input
              className="auth-input"
              onChange={(event) => {
                setCaption(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-accentBlue rounded-lg py-1 text-white disabled:bg-gray-400"
            disabled={!dataAcceptable}
          >
            Post
          </button>
        </form>
      </div>
    );
  }
};

export default Create;
