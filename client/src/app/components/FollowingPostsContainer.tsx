import axios from "axios";
const getFollowingPosts = (uid: any) => {
  return axios
    .get(`http://localhost:3001/posts/following/6497ca91bf398e94142a2f11`, {
      params: { uid: uid },
    })
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
