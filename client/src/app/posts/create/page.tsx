"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";
const Create = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/posts/create/${user._id}`, {
        img: image,
        caption,
      })
      .then((response) => {
        router.push("/");
      })
      .catch((err) => console.log(err));
  };
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
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Create;
