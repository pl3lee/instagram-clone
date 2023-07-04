import {PostInterface} from './Post';
export interface UserInterface {
  _id: string;
  firebaseId: string;
  username: string;
  profilePicture: string;
  bio: string;
  follows: [string];
  followers: [string];
  notifications: [string];
  likes: [string];
  rooms: [string];
  posts: [PostInterface]
}