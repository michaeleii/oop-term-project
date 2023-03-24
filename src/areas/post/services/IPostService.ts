import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface";
import IFollower from "../../../interfaces/follower.interface";
import DBClient from "../../../PrismaClient";
import IDatabase from "../../../interfaces/database.interface.ts";

export default interface IPostService {
  readonly _db: DBClient | IDatabase;
  addPost(message: string, userId: string): Promise<void>;
  deletePost(postId: string): Promise<void>;

  sortPosts(): Promise<IPost[]>;

  getAllPosts(userId: string): Promise<IPost[]>;
  getAllPostsByUserFollowers(followers: IFollower[]): Promise<IPost[]>;

  getUserFollowers(userId: string): Promise<IFollower[]>;

  findById(id: string): Promise<IPost | undefined>;

  likePost(postId: string, userId: string): Promise<void>;

  unlikePost(postId: string, userId: string): Promise<void>;

  addCommentToPost(creator: string, message: string, postId: string): Promise<IComment | void>;
}
