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
      <PostHeader
        profilePicture={user?.profilePicture}
        username={user?.username}
      />
      <PostImage img={post.img} />
      <div className="flex">
        <ul className="px-8 py-2 flex gap-3 justify-between w-full bg-white dark:bg-black">
          <li className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#000"
              // className="svg-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

const PostHeader = ({ profilePicture, username }: any) => {
  return (
    <div className="flex gap-2 px-2 py-3">
      <div className="flex-shrink-0 flex-grow-[1]">
        <img
          src={profilePicture}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
      <div className="flex-[9] text-lg font-bold flex items-center">
        {username}
      </div>
    </div>
  );
};

const PostImage = ({ img }: any) => {
  return (
    <div>
      <img src={img} className="w-full h-auto" />
    </div>
  );
};
export default FollowingPostsContainer;
