"use client";
import { Card, Drawer } from "@rewind-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewComments = ({ post }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Drawer position="bottom" open={open} onClose={() => setOpen(false)}>
        <Card className="w-full">
          <Card.Header>
            <div className="text-xl text-black">Comments</div>
          </Card.Header>
          <Card.Body>
            <div className="text-black">
              {post.comments.map((comment: any) => {
                return <Comment key={comment._id} comment={comment} />;
              })}
            </div>
          </Card.Body>
        </Card>
      </Drawer>
      <button onClick={() => setOpen(true)}>View comments</button>
    </div>
  );
};

const Comment = ({ comment }: any) => {
  const [commentUser, setCommentUser] = useState<any>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${comment?.uid}`)
      .then((response) => setCommentUser(response.data))
      .catch((err) => console.log(err));
  });
  return (
    <div className="flex gap-3">
      <div className="flex-grow-1 flex p-2">
        <div className="flex-shrink-0">
          <img
            src={commentUser?.profilePicture}
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex-grow-8">
        <div className="flex flex-col gap-1 p-2 w-3/5">
          <div className="text-sm font-bold">{commentUser?.username}</div>
          <div className="text-sm break-words">{comment?.comment}</div>
        </div>
      </div>
    </div>
  );
};
export default ViewComments;
