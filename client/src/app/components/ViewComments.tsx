"use client";
import { Card, Drawer } from "@rewind-ui/core";
import axios from "axios";
import { useEffect, useState, useContext, FormEventHandler } from "react";
import { Input } from "@rewind-ui/core";
import useUser from "../hooks/useUser";
import LoadingComponent from "./LoadingComponent";
import Navbar from "./Navbar";
import { PostInterface } from "../interfaces/Post";
import { CommentInterface } from "../interfaces/Comment";
import { UserInterface } from "../interfaces/User";
import ProfilePictureIcon from "./ProfilePictureIcon";

const ViewComments = ({ post }: { post: PostInterface }) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const [commentPlaceHolder, setCommentPlaceHolder] = useState("Add a comment");

  const { user, isLoading } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComment("");
    setCommentPlaceHolder("Posting comment...");
    axios
      .patch(`http://localhost:3001/posts/comment/${user?._id}/${post._id}`, {
        comment,
      })
      .then((response) => {
        axios
          .get(`http://localhost:3001/posts/comments/${post._id}`)
          .then((response) => {
            setComments(response.data);
            setCommentPlaceHolder("Add a comment");
          });
      })
      .catch((err) => {
        console.log(err);
        setCommentPlaceHolder("Add a comment");
      });
  };
  if (isLoading) {
    return <LoadingComponent />;
  } else {
    return (
      <div>
        <Drawer
          position="bottom"
          open={open}
          onClose={() => setOpen(false)}
          className="rounded-lg"
        >
          <Card className="w-full bg-white dark:bg-black border-none">
            <Card.Header>
              <div className="flex flex-col gap-3">
                <div className="text-3xl text-center font-bold">Comments</div>
                <div className="flex gap-3">
                  <div className="flex-grow-1">
                    <ProfilePictureIcon
                      image={user ? user.profilePicture : ""}
                      size="lg"
                    />
                  </div>
                  <div className="flex-grow-7 justify-start items-center flex">
                    <form onSubmit={handleSubmit} className="w-full">
                      <Input
                        withRing={false}
                        color="gray"
                        className="rounded-full"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={commentPlaceHolder}
                        rightIcon={
                          <button
                            type="submit"
                            className="justify-center flex items-center"
                            disabled={comment.length === 0}
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
            </Card.Header>
            <Card.Body>
              <div className=" max-h-[50vh] overflow-y-scroll">
                {comments.length > 0 ? (
                  [...comments].reverse().map((comment: CommentInterface) => {
                    return <Comment key={comment._id} comment={comment} />;
                  })
                ) : (
                  <div>No comments yet</div>
                )}
              </div>
            </Card.Body>
            <Card.Footer>
              <Navbar />
            </Card.Footer>
          </Card>
        </Drawer>
        <button onClick={() => setOpen(true)}>View comments</button>
      </div>
    );
  }
};

const Comment = ({ comment }: { comment: CommentInterface }) => {
  const [commentUser, setCommentUser] = useState<UserInterface | null>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${comment?.uid}`)
      .then((response) => setCommentUser(response.data))
      .catch((err) => console.log(err));
  }, [comment]);
  return (
    <div className="flex gap-3">
      <div className="flex-grow-1 flex p-2 justify-center items-center">
        <ProfilePictureIcon
          image={commentUser ? commentUser.profilePicture : ""}
          size="lg"
        />
      </div>
      <div className="flex-grow-8">
        <div className="flex flex-col gap-1 p-2">
          <div className="text-sm font-bold">{commentUser?.username}</div>
          <div className="text-sm break-words">{comment?.comment}</div>
        </div>
      </div>
    </div>
  );
};
export default ViewComments;
