"use client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import Error from "@/app/error";
const Create = () => {
  const { user, setUser, error, loading } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const router = useRouter();
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
  if (loading) return <Loading />;
  if (error) return <Error />;
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
