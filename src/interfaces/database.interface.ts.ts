import IComment from "./comment.interface";
import IFollower from "./follower.interface";
import ILike from "./like.interface";
import IPost from "./post.interface";
import IUser from "./user.interface";

export default interface IDatabase {
  users: IUser[];
  followers: IFollower[];
  posts: IPost[];
  comments: IComment[];
  likes: ILike[];
}
