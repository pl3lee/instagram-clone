import axios from "axios";
const getFollowingPosts = async (uid: any) => {
  return axios
    .get(`http://localhost:3001/posts/following/${uid}`)
    .then((response) => response.data)
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

const getUser = async (uid: string) => {
  return axios
    .get(`http://localhost:3001/users/${uid}`)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};
const Post = async ({ post }: any) => {
  const [user] = await Promise.all([getUser(post.uid)]);
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="flex-shrink-0 flex-grow-[1]">
          <img
            src={user?.profilePicture}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div className="flex-[9] text-lg font-bold flex items-center">
          {user?.username}
        </div>
      </div>
    </div>
  );
};

export default FollowingPostsContainer;
