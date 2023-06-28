"use client";
import { Card, Drawer } from "@rewind-ui/core";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../loading";

const ViewComments = ({ post }: any) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(post.comments);
  // const { user, setUser, loading, error } = useContext(AuthContext);
  const [comment, setComment] = useState("");

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/posts/comment/${user._id}/${post._id}`, {
        comment,
      })
      .then((response) => {
        setComment("");
        axios
          .get(`http://localhost:3001/posts/comments/${post._id}`)
          .then((response) => setComments(response.data));
      });
  };

  return (
    <div>
      <Drawer position="bottom" open={open} onClose={() => setOpen(false)}>
        <Card className="w-full">
          <Card.Header>
            <div className="text-xl text-black">Comments</div>
          </Card.Header>
          <Card.Body>
            <div className="text-black max-h-[50vh] overflow-y-scroll">
              {comments.length > 0 ? (
                comments.map((comment: any) => {
                  return <Comment key={comment._id} comment={comment} />;
                })
              ) : (
                <div className="text-black">No comments yet</div>
              )}
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="flex gap-3">
              <div className="flex-grow-1 flex p-2 flex-shrink-0">
                <div className="flex-shrink-0">
                  <img
                    src={user?.profilePicture}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow-8 justify-start items-center flex">
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="text-black border border-solid border-slate-300 rounded-full p-2 focus:outline-none"
                  />
                </form>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </Drawer>
      <button onClick={() => setOpen(true)}>View comments</button>
    </div>
  );
};

const Comment = ({ comment, user }: any) => {
  const [commentUser, setCommentUser] = useState<any>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${comment?.uid}`)
      .then((response) => setCommentUser(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex gap-3">
      <div className="flex-grow-1 flex p-2 flex-shrink-0">
        <div className="flex-shrink-0">
          <img
            src={commentUser?.profilePicture}
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </div>
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
