import IDatabase from "../../../interfaces/database.interface.ts";
import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface";
import IFollower from "../../../interfaces/follower.interface";
import DBClient from "../../../PrismaClient";

export default interface IPostService {
  readonly _db: DBClient | IDatabase;
  addPost(message: string, userId: number): Promise<void>;
  deletePost(postId: number): Promise<void>;

  sortPosts(): Promise<IPost[]>;

  getAllPosts(userId: number): Promise<IPost[]>;
  getAllPostsByUserFollowers(followers: IFollower[]): Promise<IPost[]>;

  getUserFollowers(userId: number): Promise<IFollower[]>;

  findById(id: number): Promise<IPost | undefined>;

  likePost(postId: number, userId: number): Promise<void>;

  unlikePost(postId: number, userId: number): Promise<void>;

  addCommentToPost(creator: number, message: string, postId: number): Promise<IComment | void>;
}
