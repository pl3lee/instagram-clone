import {CommentInterface} from './Comment';
export interface PostInterface {
    _id: string;
    uid: string;
    img: string;
    caption: string;
    likes: [string];
    comments: [CommentInterface];
    postDateTime: string;
}