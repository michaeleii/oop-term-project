import { database } from "../../../model/fakeDB";
import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import IFollower from "../../../interfaces/follower.interface";

export class MockPostService implements IPostService {
  readonly _db = database;
  async addPost(message: string, userId: number): Promise<void> {
    this._db.posts.push({
      id: this._db.posts.length + 1,
      creatorId: userId,
      message: message,
      createdAt: new Date(Date.now()),
    });
  }
  async deletePost(postId: number): Promise<void> {
    this._db.posts = this._db.posts.filter((post) => post.id !== postId);
    this._db.comments = this._db.comments.filter((comment) => comment.postId !== postId);
  }

  async getAllPosts(userId: number): Promise<IPost[]> {
    const sortedPosts = await this.sortPosts();
    return sortedPosts.filter((post) => post.creatorId === userId);
  }
  async getAllPostsByUserFollowers(followers: IFollower[]): Promise<IPost[]> {
    const allFollowersPosts: IPost[] = [];
    followers.forEach(async (follower) => {
      const followersPosts = await this.getAllPosts(follower.followingId);
      allFollowersPosts.push(...followersPosts);
    });
    return allFollowersPosts;
  }
  async getUserFollowers(userId: number): Promise<IFollower[]> {
    return this._db.followers.filter((f) => f.userId === userId);
  }

  async sortPosts(): Promise<IPost[]> {
    return this._db.posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findById(id: number): Promise<IPost> {
    return this._db.posts.find((post) => post.id === id);
  }

  async likePost(postId: number, userId: number): Promise<void> {
    this._db.likes.push({
      id: this._db.likes.length + 1,
      postId: postId,
      userId: userId,
    });
  }

  async unlikePost(postId: number, userId: number): Promise<void> {
    this._db.likes = this._db.likes.filter((like) => like.postId !== postId && like.userId === userId);
  }

  async addCommentToPost(creator: number, message: string, postId: number): Promise<void> {
    this._db.comments.push({
      id: this._db.comments.length + 1,
      postId: postId,
      createdAt: new Date(Date.now()),
      creator: creator,
      message: message,
    });
  }
}
