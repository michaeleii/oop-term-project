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
    return this.sortPosts(this._db.posts).filter((post) => post.creator === userId);
  }

  sortPosts(posts: IPost[]): IPost[] {
    return this._db.posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  findById(id: number): IPost {
    return this._db.posts.find((post) => post.id === id);
  }

  likePost(postId: number, userId: number): void {
    this._db.likes.push({
      id: this._db.likes.length + 1,
      postId: postId,
      userId: userId,
    });
  }

  unlikePost(postId: number, userId: number): void {
    this._db.likes = this._db.likes.filter((like) => like.postId !== postId && like.userId !== userId);
  }

  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
