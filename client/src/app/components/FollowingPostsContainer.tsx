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
      <PostIconBar />
      <PostInformation post={post} user={user} />
    </div>
  );
};

const PostHeader = ({ profilePicture, username }: any) => {
  return (
    <div className="flex gap-1 px-2 py-3">
      <div className="flex-shrink-0 mr-3">
        <img
          src={profilePicture}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
      <div className="flex-grow-[9] text-lg font-bold flex items-center">
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

const PostIconBar = () => {
  return (
    <div className="flex">
      <ul className="px-2 py-2 flex gap-3 justify-start w-full bg-white dark:bg-black">
        <li className="icon-container p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-7 h-7 dark:stroke-white stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </li>
        <li className="icon-container p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 dark:stroke-white stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
};

const PostInformation = ({ post, user }: any) => {
  return (
    <div className="flex flex-col px-2 py-2 gap-1">
      <div>
        <div className="flex items-center gap-1">
          <span className="inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </span>
          {post.likes.length} Likes
        </div>
      </div>
      <div>
        <span className="font-bold">{user.username}</span> {post.caption}
      </div>
    </div>
  );
};
export default FollowingPostsContainer;
