import axios from "axios";
import Post from "./Post";

const getFollowingPosts = async (uid: any) => {
  return axios
    .get(`http://localhost:3001/posts/following/${uid}`)
    .then((response) => response.data.reverse())
    .catch((err) => console.log(err));
};

const FollowingPostsContainer = async ({ uid }: any) => {
  const [posts] = await Promise.all([getFollowingPosts(uid)]);

  return (
    <div>
      {posts.map((post: any) => {
        return (
          <div key={post._id}>
            <Post post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default FollowingPostsContainer;
