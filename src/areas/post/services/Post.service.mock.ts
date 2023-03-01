import { database } from "../../../model/fakeDB";
import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";

export class MockPostService implements IPostService {
  readonly _db = database;
  addPost(message: string, userId: number): void {
    this._db.posts.push({
      id: this._db.posts.length + 1,
      creator: userId,
      message: message,
      createdAt: new Date(Date.now()),
    });
  }
  getAllPosts(userId: number): IPost[] {
    return this._db.posts
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((post) => post.creator === userId);
  }
  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
