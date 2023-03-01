import IDatabase from "../../../interfaces/database.interface.ts";
import IPost from "../../../interfaces/post.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  readonly _db: IDatabase;
  addPost(message: string, userId: number): void;

  sortPosts(posts: IPost[]): IPost[];

  getAllPosts(userId: number): IPost[];

  findById(id: number): IPost | undefined;

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): IPost | void;
}
