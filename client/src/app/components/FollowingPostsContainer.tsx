import axios from "axios";
const getFollowingPosts = async (uid: any) => {
  return axios
    .get(`http://localhost:3001/posts/following/${uid}`)
    .then((response) => response.data);
};

const FollowingPostsContainer = async ({ uid }: any) => {
  const [posts] = await Promise.all([getFollowingPosts(uid)]);
  return (
    <div>
      {posts.map((post: any) => {
        return (
          <div key={post._id}>
            <img src={post.img} />
            <p>{post.caption}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FollowingPostsContainer;
